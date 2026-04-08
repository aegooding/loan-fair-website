import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { requireRole } from '../middleware/auth.js';
import { AppError } from '../middleware/errorHandler.js';
import { runFullAssessment, scoreEnquiry, matchLenders, generateBrokerNarrative } from '../services/ai.js';
import { createHubSpotContact, createHubSpotDeal, updateHubSpotDeal, addHubSpotNote, createEnquiryNote } from '../services/hubspot.js';
import { queueWebhook } from './webhooks.js';
import { generateReference, logAudit } from '../lib/utils.js';
import { calculateCarLtv } from '../services/rateMatrix.js';

const router = Router();

// LIST
router.get('/', async (req, res, next) => {
  try {
    const { status, loanType, page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const where = {};
    if (status) where.status = status;
    if (loanType) where.loanType = loanType;
    if (req.user.role === 'BROKER') where.assignedUserId = req.user.id;
    if (req.user.role === 'CLIENT') where.createdById = req.user.id;

    const [enquiries, total] = await Promise.all([
      prisma.enquiry.findMany({
        where, skip, take: Number(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          client: { include: { user: { select: { name: true, email: true } } } },
          assignedUser: { select: { id: true, name: true } },
          _count: { select: { documents: true, applications: true } },
        },
      }),
      prisma.enquiry.count({ where }),
    ]);

    res.json({ success: true, data: enquiries, meta: { total, page: Number(page), limit: Number(limit) } });
  } catch (err) { next(err); }
});

// CREATE
router.post('/', async (req, res, next) => {
  try {
    const {
      clientId, loanType, loanAmount, loanTerm, loanPurpose,
      vehicleMake, vehicleModel, vehicleYear, vehicleKms,
      vehicleCondition, vehicleType, saleType, dealerName, dealerABN, dealerState,
      vehicleGlassValue, deposit, tradeInValue, tradeInOwing, balloonAmount, balloonPercent,
      clientData,
    } = req.body;

    if (!clientId || !loanType || !loanAmount) {
      throw new AppError('clientId, loanType, and loanAmount are required', 400);
    }

    let client = await prisma.client.findUnique({
      where: { id: clientId },
      include: { user: true },
    });
    if (!client) throw new AppError('Client not found', 404);

    // Save all personal/financial data supplied by the frontend form
    if (clientData) {
      await prisma.client.update({
        where: { id: clientId },
        data: {
          // Personal
          dateOfBirth:       clientData.dateOfBirth ? new Date(clientData.dateOfBirth) : undefined,
          maritalStatus:     clientData.maritalStatus     || undefined,
          numDependants:     clientData.numDependants     != null ? Number(clientData.numDependants) : undefined,
          dependantAges:     Array.isArray(clientData.dependantAges) ? clientData.dependantAges.map(Number) : undefined,
          licenceNumber:     clientData.licenceNumber     || undefined,
          licenceExpiry:     clientData.licenceExpiry     || undefined,
          licenceCardNumber: clientData.licenceCardNumber || undefined,
          licenceState:      clientData.licenceState      || undefined,
          // Current address
          address:              clientData.address             || undefined,
          streetAddress:        clientData.streetAddress       || undefined,
          city:                 clientData.city                || undefined,
          state:                clientData.state               || undefined,
          postcode:             clientData.postcode            || undefined,
          residencyStatus:      clientData.residencyStatus     || undefined,
          mortgageBalance:      clientData.mortgageBalance     != null ? Number(clientData.mortgageBalance)     : undefined,
          mortgageRepayments:   clientData.mortgageRepayments  != null ? Number(clientData.mortgageRepayments)  : undefined,
          rentalPayments:       clientData.rentalPayments      != null ? Number(clientData.rentalPayments)      : undefined,
          timeAtAddressYears:   clientData.timeAtAddressYears  != null ? Number(clientData.timeAtAddressYears)  : undefined,
          timeAtAddressMonths:  clientData.timeAtAddressMonths != null ? Number(clientData.timeAtAddressMonths) : undefined,
          // Previous address
          prevAddress:            clientData.prevAddress            || undefined,
          prevResidentialStatus:  clientData.prevResidentialStatus  || undefined,
          prevMortgageBalance:    clientData.prevMortgageBalance    != null ? Number(clientData.prevMortgageBalance)    : undefined,
          prevMortgageRepayments: clientData.prevMortgageRepayments != null ? Number(clientData.prevMortgageRepayments) : undefined,
          prevRentalPayments:     clientData.prevRentalPayments     != null ? Number(clientData.prevRentalPayments)     : undefined,
          // Other property
          otherPropertyMortgage:   clientData.otherPropertyMortgage   || undefined,
          otherPropertyBalance:    clientData.otherPropertyBalance    != null ? Number(clientData.otherPropertyBalance)    : undefined,
          otherPropertyRepayments: clientData.otherPropertyRepayments != null ? Number(clientData.otherPropertyRepayments) : undefined,
          // Employment
          occupation:        clientData.occupation        || undefined,
          employmentStatus:  clientData.employmentStatus  || undefined,
          employerName:      clientData.employerName      || undefined,
          employmentYears:   clientData.employmentYears   != null ? Number(clientData.employmentYears)  : undefined,
          timeInJobYears:    clientData.timeInJobYears    != null ? Number(clientData.timeInJobYears)   : undefined,
          timeInJobMonths:   clientData.timeInJobMonths   != null ? Number(clientData.timeInJobMonths)  : undefined,
          prevOccupation:    clientData.prevOccupation    || undefined,
          prevEmployerName:  clientData.prevEmployerName  || undefined,
          prevEmploymentType: clientData.prevEmploymentType || undefined,
          // Income
          annualIncome:           clientData.annualIncome          != null ? Number(clientData.annualIncome)          : undefined,
          afterTaxIncome:         clientData.afterTaxIncome        != null ? Number(clientData.afterTaxIncome)        : undefined,
          incomeFrequency:        clientData.incomeFrequency       || undefined,
          otherIncomeSources:     Array.isArray(clientData.otherIncomeSources) ? clientData.otherIncomeSources : undefined,
          otherIncome:            clientData.partnerAnnualIncome   != null ? Number(clientData.partnerAnnualIncome)   : undefined,
          partnerIncome:          clientData.partnerIncome         != null ? Number(clientData.partnerIncome)         : undefined,
          partnerIncomeFrequency: clientData.partnerIncomeFrequency || undefined,
          // Expenses
          monthlyExpenses:              clientData.monthlyExpenses              != null ? Number(clientData.monthlyExpenses)              : undefined,
          monthlyFixedExpenses:         clientData.monthlyFixedExpenses         != null ? Number(clientData.monthlyFixedExpenses)         : undefined,
          monthlyDiscretionaryExpenses: clientData.monthlyDiscretionaryExpenses != null ? Number(clientData.monthlyDiscretionaryExpenses) : undefined,
          fixedExpenses:                clientData.fixedExpenses         ?? undefined,
          discretionaryExpenses:        clientData.discretionaryExpenses ?? undefined,
          additionalInfo:               clientData.additionalInfo        || undefined,
        },
      });
      // Re-fetch so the HubSpot call below sees the updated data
      client = await prisma.client.findUnique({ where: { id: clientId }, include: { user: true } });
    }

    const netAmountFinanced = loanAmount - (deposit || 0) -
      Math.max(0, (tradeInValue || 0) - (tradeInOwing || 0));
    const ltvRatio = vehicleGlassValue
      ? Math.round((netAmountFinanced / vehicleGlassValue) * 100 * 100) / 100
      : null;
    const balloonPct = balloonAmount && vehicleGlassValue
      ? Math.round((balloonAmount / vehicleGlassValue) * 100 * 100) / 100
      : balloonPercent || null;

    const enquiry = await prisma.enquiry.create({
      data: {
        reference: generateReference(),
        clientId,
        createdById: req.user.id,
        assignedUserId: req.user.role === 'BROKER' ? req.user.id : null,
        loanType, loanAmount: Number(loanAmount),
        loanTerm: loanTerm ? Number(loanTerm) : null,
        loanPurpose,
        vehicleMake, vehicleModel,
        vehicleYear: vehicleYear ? Number(vehicleYear) : null,
        vehicleKms: vehicleKms ? Number(vehicleKms) : null,
        vehicleCondition, vehicleType, saleType,
        dealerName, dealerABN, dealerState,
        vehicleGlassValue: vehicleGlassValue ? Number(vehicleGlassValue) : null,
        deposit: deposit ? Number(deposit) : null,
        tradeInValue: tradeInValue ? Number(tradeInValue) : null,
        tradeInOwing: tradeInOwing ? Number(tradeInOwing) : null,
        netAmountFinanced: Number(netAmountFinanced),
        balloonAmount: balloonAmount ? Number(balloonAmount) : null,
        balloonPercent: balloonPct,
        ltvRatio,
      },
      include: { client: { include: { user: true } } },
    });

    // Push to HubSpot
    try {
      // 1. Ensure a HubSpot contact exists for this client
      if (!client.crmClientId) {
        const crmClientId = await createHubSpotContact(client, client.user);
        await prisma.client.update({ where: { id: client.id }, data: { crmClientId } });
        client = { ...client, crmClientId };
      }

      // 2. Create the deal (now associated to the contact above)
      const crmId = await createHubSpotDeal(enquiry, client, client.user);
      await prisma.enquiry.update({ where: { id: enquiry.id }, data: { crmEnquiryId: crmId } });
      enquiry.crmEnquiryId = crmId;

      // 3. Attach a note with the full financial/personal breakdown
      await createEnquiryNote(crmId, client, enquiry);
    } catch (e) { console.error('HubSpot sync failed:', e.message); }

    await logAudit(req.user.id, 'enquiry.created', enquiry.id, 'Enquiry');
    await queueWebhook('enquiry.created', enquiry);
    res.status(201).json({ success: true, data: enquiry });
  } catch (err) { next(err); }
});

// GET ONE
router.get('/:id', async (req, res, next) => {
  try {
    const enquiry = await prisma.enquiry.findUnique({
      where: { id: req.params.id },
      include: {
        client: { include: { user: true, creditChecks: { orderBy: { pulledAt: 'desc' }, take: 1 } } },
        assignedUser: { select: { id: true, name: true, email: true } },
        documents: { orderBy: { uploadedAt: 'desc' } },
        applications: { include: { lender: true }, orderBy: { createdAt: 'desc' } },
        notes: {
          where: req.user.role === 'CLIENT' ? { internal: false } : {},
          include: { author: { select: { id: true, name: true, role: true } } },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
    if (!enquiry) throw new AppError('Enquiry not found', 404);
    if (req.user.role === 'BROKER' && enquiry.assignedUserId !== req.user.id) throw new AppError('Access denied', 403);
    if (req.user.role === 'CLIENT' && enquiry.createdById !== req.user.id) throw new AppError('Access denied', 403);
    res.json({ success: true, data: enquiry });
  } catch (err) { next(err); }
});

// UPDATE STATUS
router.patch('/:id/status', requireRole('BROKER', 'ADMIN'), async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!status) throw new AppError('status is required', 400);
    const enquiry = await prisma.enquiry.update({ where: { id: req.params.id }, data: { status } });
    if (enquiry.crmEnquiryId) await updateHubSpotDeal(enquiry.crmEnquiryId, { status }).catch(console.error);
    await logAudit(req.user.id, 'enquiry.status_changed', enquiry.id, 'Enquiry', { status });
    await queueWebhook('enquiry.status_changed', enquiry);
    res.json({ success: true, data: enquiry });
  } catch (err) { next(err); }
});

// AI: FULL ASSESSMENT
router.post('/:id/ai/assess', requireRole('BROKER', 'ADMIN'), async (req, res, next) => {
  try {
    const enquiry = await prisma.enquiry.findUnique({
      where: { id: req.params.id },
      include: { client: true },
    });
    if (!enquiry) throw new AppError('Enquiry not found', 404);

    const result = await runFullAssessment(enquiry, enquiry.client);

    await prisma.enquiry.update({
      where: { id: req.params.id },
      data: {
        aiScore: result.score.score,
        aiGrade: result.score.grade,
        aiSummary: result.score.summary,
        aiFlags: result.score.flags || [],
        aiStrengths: result.score.strengths || [],
        aiRisks: result.score.risks || [],
        aiRecommendedLenders: result.matches.map((m) => m.lenderId),
        aiLastRun: new Date(),
      },
    });

    if (enquiry.crmEnquiryId) {
      await updateHubSpotDeal(enquiry.crmEnquiryId, {
        aiScore: result.score.score,
        aiSummary: result.score.summary,
      }).catch(console.error);
    }

    await queueWebhook('ai.assessment_completed', { enquiryId: enquiry.id, score: result.score.score });
    res.json({ success: true, data: result });
  } catch (err) { next(err); }
});

// NOTES
router.get('/:id/notes', async (req, res, next) => {
  try {
    const notes = await prisma.note.findMany({
      where: { enquiryId: req.params.id, ...(req.user.role === 'CLIENT' ? { internal: false } : {}) },
      include: { author: { select: { id: true, name: true, role: true } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: notes });
  } catch (err) { next(err); }
});

router.post('/:id/notes', async (req, res, next) => {
  try {
    const { content, internal = true } = req.body;
    if (!content) throw new AppError('content is required', 400);
    const note = await prisma.note.create({
      data: { enquiryId: req.params.id, authorId: req.user.id, content, internal },
      include: { author: { select: { id: true, name: true, role: true } } },
    });
    const enquiry = await prisma.enquiry.findUnique({ where: { id: req.params.id } });
    if (enquiry?.crmEnquiryId && !internal) {
      await addHubSpotNote(enquiry.crmEnquiryId, `[${req.user.name}] ${content}`).catch(console.error);
    }
    res.status(201).json({ success: true, data: note });
  } catch (err) { next(err); }
});

export default router;
