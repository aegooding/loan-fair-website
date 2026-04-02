// ============================================================
// Rate Matrix Service — exact rate lookup by credit score + LTV
// ============================================================

import { prisma } from '../lib/prisma.js';

export const getRateForClient = async ({
  lenderId,
  loanType,
  creditScore,
  ltv,
  vehicleCondition = null,
  rateType = null,
}) => {
  if (!creditScore || !ltv) return null;

  const rates = await prisma.lenderRateMatrix.findMany({
    where: {
      lenderId,
      loanType,
      minCreditScore: { lte: creditScore },
      maxCreditScore: { gte: creditScore },
      minLtv: { lte: ltv },
      maxLtv: { gte: ltv },
      validTo: null,
      ...(rateType && { rateType }),
      ...(vehicleCondition && {
        OR: [{ vehicleCondition }, { vehicleCondition: null }],
      }),
    },
    orderBy: { baseRate: 'asc' },
  });

  return rates[0] || null;
};

export const getAllLenderRates = async ({
  loanType,
  creditScore,
  ltv,
  vehicleCondition = null,
  loanAmount = null,
}) => {
  const lenders = await prisma.lender.findMany({
    where: { active: true, supportedLoanTypes: { has: loanType } },
    include: {
      rateMatrix: {
        where: {
          loanType,
          validTo: null,
          minCreditScore: { lte: creditScore || 0 },
          maxCreditScore: { gte: creditScore || 999 },
          minLtv: { lte: ltv || 0 },
          maxLtv: { gte: ltv || 999 },
          ...(vehicleCondition
            ? { OR: [{ vehicleCondition }, { vehicleCondition: null }] }
            : {}),
        },
        orderBy: { baseRate: 'asc' },
        take: 1,
      },
    },
  });

  const results = lenders.map((lender) => {
    const rate = lender.rateMatrix[0] || null;
    const policy = lender.carPolicy || {};
    let amountEligible = true;
    let amountNote = null;

    if (loanAmount) {
      if (policy.minLoanAmount && loanAmount < policy.minLoanAmount) {
        amountEligible = false;
        amountNote = `Min loan $${policy.minLoanAmount.toLocaleString()}`;
      }
      if (policy.maxLoanAmount && loanAmount > policy.maxLoanAmount) {
        amountEligible = false;
        amountNote = `Max loan $${policy.maxLoanAmount.toLocaleString()}`;
      }
    }

    return {
      lenderId: lender.id,
      lenderName: lender.name,
      lenderSlug: lender.slug,
      logoUrl: lender.logoUrl,
      hasRate: !!rate,
      amountEligible,
      amountNote,
      rate: rate
        ? { baseRate: rate.baseRate, compRate: rate.compRate, rateType: rate.rateType, note: rate.note }
        : null,
    };
  });

  return results.sort((a, b) => {
    if (a.hasRate && a.amountEligible && (!b.hasRate || !b.amountEligible)) return -1;
    if (!a.hasRate || !a.amountEligible) return 1;
    return (a.rate?.baseRate || 999) - (b.rate?.baseRate || 999);
  });
};

export const calculateCarLtv = (enquiry) => {
  const { netAmountFinanced, loanAmount, deposit, tradeInValue, tradeInOwing, vehicleGlassValue } = enquiry;
  if (!vehicleGlassValue) return null;
  const financed =
    netAmountFinanced ||
    loanAmount - (deposit || 0) - Math.max(0, (tradeInValue || 0) - (tradeInOwing || 0));
  return Math.round((financed / vehicleGlassValue) * 100 * 100) / 100;
};

export const getCreditTier = (creditScore, lenderPolicy) => {
  if (!creditScore || !lenderPolicy?.creditScoreTiers) return 'unknown';
  const { preferred, standard, acceptable } = lenderPolicy.creditScoreTiers;
  if (creditScore >= preferred) return 'preferred';
  if (creditScore >= standard) return 'standard';
  if (creditScore >= acceptable) return 'acceptable';
  return 'decline';
};

export const checkVehicleEligibility = (enquiry, lenderCarPolicy) => {
  const flags = [];
  const p = lenderCarPolicy || {};
  const currentYear = new Date().getFullYear();
  const vehicleAge = enquiry.vehicleYear ? currentYear - enquiry.vehicleYear : null;
  const ageAtEndOfTerm =
    vehicleAge !== null && enquiry.loanTerm ? vehicleAge + enquiry.loanTerm / 12 : null;

  if (vehicleAge !== null && p.maxVehicleAge && vehicleAge > p.maxVehicleAge)
    flags.push(`Vehicle too old: ${vehicleAge} years (max ${p.maxVehicleAge})`);

  if (ageAtEndOfTerm !== null && p.maxVehicleAgeAtEndOfTerm && ageAtEndOfTerm > p.maxVehicleAgeAtEndOfTerm)
    flags.push(`Vehicle will be ${Math.round(ageAtEndOfTerm)} years at loan end (max ${p.maxVehicleAgeAtEndOfTerm})`);

  if (enquiry.vehicleKms && p.maxKms && enquiry.vehicleKms > p.maxKms)
    flags.push(`Odometer ${enquiry.vehicleKms.toLocaleString()}km exceeds max ${p.maxKms.toLocaleString()}km`);

  if (enquiry.saleType === 'PRIVATE' && p.acceptsPrivateSale === false)
    flags.push('Private sale not accepted by this lender');

  if (enquiry.saleType === 'AUCTION' && p.acceptsAuction === false)
    flags.push('Auction purchase not accepted');

  if (enquiry.balloonPercent && p.maxBalloonPercent && enquiry.balloonPercent > p.maxBalloonPercent)
    flags.push(`Balloon ${enquiry.balloonPercent}% exceeds max ${p.maxBalloonPercent}%`);

  if (enquiry.vehicleType && p.acceptedVehicleTypes?.length && !p.acceptedVehicleTypes.includes(enquiry.vehicleType))
    flags.push(`Vehicle type ${enquiry.vehicleType} not accepted`);

  if (enquiry.loanAmount && p.minLoanAmount && enquiry.loanAmount < p.minLoanAmount)
    flags.push(`Loan $${enquiry.loanAmount.toLocaleString()} below minimum $${p.minLoanAmount.toLocaleString()}`);

  if (enquiry.loanAmount && p.maxLoanAmount && enquiry.loanAmount > p.maxLoanAmount)
    flags.push(`Loan $${enquiry.loanAmount.toLocaleString()} exceeds maximum $${p.maxLoanAmount.toLocaleString()}`);

  if (enquiry.loanTerm && p.maxLoanTermMonths && enquiry.loanTerm > p.maxLoanTermMonths)
    flags.push(`Loan term ${enquiry.loanTerm} months exceeds max ${p.maxLoanTermMonths} months`);

  return { eligible: flags.length === 0, flags };
};

export const buildLenderEligibilityReport = async (enquiry, client) => {
  const ltv = calculateCarLtv(enquiry);
  const lenders = await prisma.lender.findMany({
    where: { active: true, supportedLoanTypes: { has: enquiry.loanType } },
  });

  const report = await Promise.all(
    lenders.map(async (lender) => {
      const policy = lender.policy || {};
      const carPolicy = lender.carPolicy || {};
      const minScore = policy.minCreditScore || 0;
      const creditEligible = client.creditScore ? client.creditScore >= minScore : null;
      const creditTier = getCreditTier(client.creditScore, policy);
      const vehicleCheck = checkVehicleEligibility(enquiry, carPolicy);
      const rate = await getRateForClient({
        lenderId: lender.id,
        loanType: enquiry.loanType,
        creditScore: client.creditScore,
        ltv,
        vehicleCondition: enquiry.vehicleCondition,
      });

      const acceptedEmployment = policy.acceptedEmploymentTypes || [];
      const employmentEligible =
        !acceptedEmployment.length ||
        (client.employmentStatus && acceptedEmployment.includes(client.employmentStatus));

      let selfEmployedFlag = null;
      if (
        client.employmentStatus === 'SELF_EMPLOYED' &&
        policy.selfEmployedMinYears &&
        client.employmentYears < policy.selfEmployedMinYears
      ) {
        selfEmployedFlag = `Self-employed min ${policy.selfEmployedMinYears} years required (client: ${client.employmentYears || '?'} years)`;
      }

      const allFlags = [
        ...vehicleCheck.flags,
        ...(selfEmployedFlag ? [selfEmployedFlag] : []),
        ...(!creditEligible && client.creditScore
          ? [`Credit score ${client.creditScore} below minimum ${minScore}`]
          : []),
        ...(!employmentEligible ? [`Employment type ${client.employmentStatus} not accepted`] : []),
      ];

      const overallEligible =
        creditEligible !== false && vehicleCheck.eligible && employmentEligible && !selfEmployedFlag;

      return {
        lenderId: lender.id,
        lenderName: lender.name,
        lenderSlug: lender.slug,
        eligible: overallEligible,
        creditTier,
        creditEligible,
        vehicleEligible: vehicleCheck.eligible,
        employmentEligible,
        flags: allFlags,
        rate: rate
          ? { baseRate: rate.baseRate, compRate: rate.compRate, rateType: rate.rateType }
          : null,
        guidelinesText: lender.guidelinesText || null,
        policyVersion: lender.policyVersion || null,
      };
    })
  );

  return {
    ltv,
    creditScore: client.creditScore,
    lenders: report.sort((a, b) => {
      if (a.eligible && !b.eligible) return -1;
      if (!a.eligible && b.eligible) return 1;
      return (a.rate?.baseRate || 999) - (b.rate?.baseRate || 999);
    }),
  };
};
