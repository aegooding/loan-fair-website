// ============================================================
// src/routes/lenders.js
// ============================================================
import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { requireRole } from '../middleware/auth.js';
import { AppError } from '../middleware/errorHandler.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const lenders = await prisma.lender.findMany({
      where: { active: true },
      include: { _count: { select: { rateMatrix: true, applications: true } } },
      orderBy: { name: 'asc' },
    });
    res.json({ success: true, data: lenders });
  } catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const lender = await prisma.lender.findUnique({
      where: { id: req.params.id },
      include: { rateMatrix: { where: { validTo: null }, orderBy: { baseRate: 'asc' } } },
    });
    if (!lender) throw new AppError('Lender not found', 404);
    res.json({ success: true, data: lender });
  } catch (err) { next(err); }
});

router.post('/', requireRole('ADMIN'), async (req, res, next) => {
  try {
    const { name, slug, policy, carPolicy, guidelinesText, supportedLoanTypes } = req.body;
    if (!name || !slug) throw new AppError('name and slug are required', 400);
    const lender = await prisma.lender.create({
      data: { name, slug, policy, carPolicy, guidelinesText, supportedLoanTypes: supportedLoanTypes || [] },
    });
    res.status(201).json({ success: true, data: lender });
  } catch (err) { next(err); }
});

router.put('/:id', requireRole('ADMIN'), async (req, res, next) => {
  try {
    const { name, policy, carPolicy, guidelinesText, active, policyVersion } = req.body;
    const lender = await prisma.lender.update({
      where: { id: req.params.id },
      data: {
        ...(name && { name }),
        ...(policy && { policy }),
        ...(carPolicy && { carPolicy }),
        ...(guidelinesText !== undefined && { guidelinesText }),
        ...(active !== undefined && { active }),
        ...(policyVersion && { policyVersion, policyUpdatedAt: new Date() }),
      },
    });
    res.json({ success: true, data: lender });
  } catch (err) { next(err); }
});

// Rate matrix endpoints
router.get('/:id/rates', async (req, res, next) => {
  try {
    const rates = await prisma.lenderRateMatrix.findMany({
      where: { lenderId: req.params.id, validTo: null },
      orderBy: [{ minCreditScore: 'desc' }, { baseRate: 'asc' }],
    });
    res.json({ success: true, data: rates });
  } catch (err) { next(err); }
});

router.post('/:id/rates', requireRole('ADMIN'), async (req, res, next) => {
  try {
    const { loanType, minCreditScore, maxCreditScore, minLtv, maxLtv, vehicleCondition, baseRate, compRate, rateType, note } = req.body;
    const rate = await prisma.lenderRateMatrix.create({
      data: {
        lenderId: req.params.id,
        loanType, minCreditScore, maxCreditScore, minLtv, maxLtv,
        vehicleCondition: vehicleCondition || null,
        baseRate, compRate: compRate || null,
        rateType: rateType || 'FIXED_5Y',
        note: note || null,
      },
    });
    res.status(201).json({ success: true, data: rate });
  } catch (err) { next(err); }
});

router.delete('/:id/rates/:rateId', requireRole('ADMIN'), async (req, res, next) => {
  try {
    // Soft delete by setting validTo
    await prisma.lenderRateMatrix.update({
      where: { id: req.params.rateId },
      data: { validTo: new Date() },
    });
    res.json({ success: true, message: 'Rate deactivated' });
  } catch (err) { next(err); }
});

export default router;
