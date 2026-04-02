// ============================================================
// src/routes/crm.js
// ============================================================
import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { requireRole } from '../middleware/auth.js';
import { AppError } from '../middleware/errorHandler.js';
import { createHubSpotContact, updateHubSpotContact, createHubSpotDeal, updateHubSpotDeal, getHubSpotDeal } from '../services/hubspot.js';

export const crmRouter = Router();

crmRouter.get('/status', requireRole('ADMIN'), async (req, res, next) => {
  try {
    const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts?limit=1', {
      headers: { Authorization: `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}` },
    });
    res.json({ success: true, data: { connected: response.ok, provider: 'HubSpot', statusCode: response.status } });
  } catch (err) { next(err); }
});

crmRouter.post('/sync/client/:id', requireRole('BROKER', 'ADMIN'), async (req, res, next) => {
  try {
    const client = await prisma.client.findUnique({ where: { id: req.params.id }, include: { user: true } });
    if (!client) throw new AppError('Client not found', 404);
    let crmClientId;
    if (client.crmClientId) {
      await updateHubSpotContact(client.crmClientId, { annual_income: client.annualIncome?.toString(), credit_score: client.creditScore?.toString() });
      crmClientId = client.crmClientId;
    } else {
      crmClientId = await createHubSpotContact(client, client.user);
      await prisma.client.update({ where: { id: client.id }, data: { crmClientId } });
    }
    res.json({ success: true, data: { crmClientId } });
  } catch (err) { next(err); }
});

crmRouter.post('/sync/enquiry/:id', requireRole('BROKER', 'ADMIN'), async (req, res, next) => {
  try {
    const enquiry = await prisma.enquiry.findUnique({ where: { id: req.params.id }, include: { client: { include: { user: true } }, createdBy: true } });
    if (!enquiry) throw new AppError('Enquiry not found', 404);
    let crmEnquiryId;
    if (enquiry.crmEnquiryId) {
      await updateHubSpotDeal(enquiry.crmEnquiryId, { status: enquiry.status, loanAmount: enquiry.loanAmount });
      crmEnquiryId = enquiry.crmEnquiryId;
    } else {
      crmEnquiryId = await createHubSpotDeal(enquiry, enquiry.client, enquiry.createdBy);
      await prisma.enquiry.update({ where: { id: enquiry.id }, data: { crmEnquiryId } });
    }
    res.json({ success: true, data: { crmEnquiryId } });
  } catch (err) { next(err); }
});

crmRouter.post('/pull/enquiry/:id', requireRole('BROKER', 'ADMIN'), async (req, res, next) => {
  try {
    const enquiry = await prisma.enquiry.findUnique({ where: { id: req.params.id } });
    if (!enquiry) throw new AppError('Enquiry not found', 404);
    if (!enquiry.crmEnquiryId) throw new AppError('Enquiry not linked to HubSpot', 400);
    const deal = await getHubSpotDeal(enquiry.crmEnquiryId);
    const stageToStatus = { appointmentscheduled: 'NEW', qualifiedtobuy: 'IN_PROGRESS', presentationscheduled: 'SUBMITTED', decisionmakerboughtin: 'CONDITIONALLY_APPROVED', contractsent: 'APPROVED', closedwon: 'SETTLED', closedlost: 'DECLINED' };
    const updates = {};
    if (deal.properties.dealstage && stageToStatus[deal.properties.dealstage]) updates.status = stageToStatus[deal.properties.dealstage];
    if (Object.keys(updates).length) await prisma.enquiry.update({ where: { id: enquiry.id }, data: updates });
    res.json({ success: true, data: { pulled: updates } });
  } catch (err) { next(err); }
});

// ============================================================
// src/routes/ai.js
// ============================================================
import { brokerChat, extractDocumentData } from '../services/ai.js';

export const aiRouter = Router();

aiRouter.post('/chat', requireRole('BROKER', 'ADMIN'), async (req, res, next) => {
  try {
    const { messages, enquiryContext } = req.body;
    if (!messages?.length) throw new AppError('messages array is required', 400);
    const reply = await brokerChat(messages, enquiryContext);
    res.json({ success: true, data: { reply } });
  } catch (err) { next(err); }
});

aiRouter.post('/extract', requireRole('BROKER', 'ADMIN'), async (req, res, next) => {
  try {
    const { documentType, documentContent } = req.body;
    if (!documentType || !documentContent) throw new AppError('documentType and documentContent are required', 400);
    const extracted = await extractDocumentData(documentType, documentContent);
    res.json({ success: true, data: extracted });
  } catch (err) { next(err); }
});

// ============================================================
// src/routes/webhooks.js
// ============================================================
import { verifyHubSpotWebhook } from '../services/hubspot.js';

export const webhookRouter = Router();

webhookRouter.post('/hubspot', async (req, res, next) => {
  try {
    const signature = req.headers['x-hubspot-signature'];
    if (!signature) throw new AppError('Missing signature', 401);
    if (!verifyHubSpotWebhook(JSON.stringify(req.body), signature)) throw new AppError('Invalid signature', 401);
    const events = Array.isArray(req.body) ? req.body : [req.body];
    for (const event of events) {
      if (event.subscriptionType !== 'deal.propertyChange') continue;
      const enquiry = await prisma.enquiry.findFirst({ where: { crmEnquiryId: event.objectId?.toString() } });
      if (!enquiry) continue;
      const stageToStatus = { appointmentscheduled: 'NEW', qualifiedtobuy: 'IN_PROGRESS', closedwon: 'SETTLED', closedlost: 'DECLINED' };
      if (event.propertyName === 'dealstage' && stageToStatus[event.propertyValue]) {
        await prisma.enquiry.update({ where: { id: enquiry.id }, data: { status: stageToStatus[event.propertyValue] } });
      }
    }
    res.json({ success: true });
  } catch (err) { next(err); }
});

webhookRouter.get('/events', async (req, res, next) => {
  try {
    const events = await prisma.webhookEvent.findMany({ orderBy: { createdAt: 'desc' }, take: 100 });
    res.json({ success: true, data: events });
  } catch (err) { next(err); }
});

export const queueWebhook = async (event, payload) => {
  const targets = process.env.WEBHOOK_TARGETS?.split(',').filter(Boolean) || [];
  for (const target of targets) {
    const record = await prisma.webhookEvent.create({
      data: { enquiryId: payload.id || payload.enquiryId || null, target, event, payload, status: 'PENDING' },
    });
    deliverWebhook(record).catch(console.error);
  }
};

const deliverWebhook = async (webhookEvent) => {
  const url = process.env[`WEBHOOK_URL_${webhookEvent.target.toUpperCase()}`];
  if (!url) return;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-LoanFair-Event': webhookEvent.event },
      body: JSON.stringify({ event: webhookEvent.event, data: webhookEvent.payload, timestamp: new Date().toISOString() }),
    });
    await prisma.webhookEvent.update({ where: { id: webhookEvent.id }, data: { status: res.ok ? 'SUCCESS' : 'FAILED', attempts: { increment: 1 }, lastAttempt: new Date(), error: res.ok ? null : `HTTP ${res.status}` } });
  } catch (err) {
    await prisma.webhookEvent.update({ where: { id: webhookEvent.id }, data: { status: 'FAILED', attempts: { increment: 1 }, lastAttempt: new Date(), error: err.message } });
  }
};

// ============================================================
// STUB ROUTES (to prevent app.js import errors — expand later)
// ============================================================
import { Router as R } from 'express';

export const clientsRouter = R();
clientsRouter.get('/', async (req, res) => res.json({ success: true, data: [], message: 'Clients route — coming soon' }));

export const documentsRouter = R();
documentsRouter.get('/', async (req, res) => res.json({ success: true, data: [], message: 'Documents route — coming soon' }));

export const applicationsRouter = R();
applicationsRouter.get('/', async (req, res) => res.json({ success: true, data: [], message: 'Applications route — coming soon' }));

export const reportsRouter = R();
reportsRouter.get('/', async (req, res) => res.json({ success: true, data: {}, message: 'Reports route — coming soon' }));

// Get client profile by user ID
clientsRouter.get('/by-user/:userId', async (req, res, next) => {
  try {
    const client = await prisma.client.findUnique({
      where: { userId: req.params.userId },
    });
    if (!client) throw new AppError('Client not found', 404);
    res.json({ success: true, data: client });
  } catch (err) { next(err); }
});
