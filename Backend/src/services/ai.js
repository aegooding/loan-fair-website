// ============================================================
// AI Decisioning Service — Car Loans (Phase 1)
// ============================================================

import Anthropic from '@anthropic-ai/sdk';
import { buildLenderEligibilityReport, calculateCarLtv } from './rateMatrix.js';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const MODEL = 'claude-sonnet-4-20250514';

const fmt$ = (n) => (n ? `$${Number(n).toLocaleString('en-AU')}` : 'Not provided');
const fmtPct = (n) => (n !== null && n !== undefined ? `${n}%` : 'Unknown');
const fmtScore = (n) => (n ? `${n}` : 'Not provided');

const vehicleDesc = (e) =>
  [e.vehicleYear, e.vehicleMake, e.vehicleModel, e.vehicleCondition ? `(${e.vehicleCondition})` : '', e.vehicleKms ? `${e.vehicleKms.toLocaleString()}km` : '']
    .filter(Boolean)
    .join(' ') || 'Not specified';

// ── FULL ASSESSMENT PIPELINE ─────────────────────────────────
// This is the main function — runs everything in one go

export const runFullAssessment = async (enquiry, clientProfile) => {
  const { matches, eligibilityReport } = await matchLenders(enquiry, clientProfile);
  const score = await scoreEnquiry(enquiry, clientProfile, eligibilityReport);
  const topMatch = matches[0] || null;
  const narrative = await generateBrokerNarrative(enquiry, clientProfile, score, topMatch);

  return {
    score,
    matches,
    eligibilityReport,
    narrative,
    ranAt: new Date().toISOString(),
  };
};

// ── ELIGIBILITY SCORING ──────────────────────────────────────

export const scoreEnquiry = async (enquiry, clientProfile, eligibilityReport) => {
  const ltv = calculateCarLtv(enquiry);

  const lenderSummary = eligibilityReport.lenders
    .map(
      (l) =>
        `  - ${l.lenderName}: ${l.eligible ? '✓ ELIGIBLE' : '✗ INELIGIBLE'} | ` +
        `Credit tier: ${l.creditTier} | Rate: ${l.rate ? `${l.rate.baseRate}% ${l.rate.rateType}` : 'No rate match'} | ` +
        `Flags: ${l.flags.length ? l.flags.join('; ') : 'None'}`
    )
    .join('\n');

  const prompt = `You are a senior Australian car finance credit analyst. Assess this enquiry and return a structured evaluation.

LOAN:
- Type: ${enquiry.loanType}
- Amount: ${fmt$(enquiry.loanAmount)}, Term: ${enquiry.loanTerm ? `${enquiry.loanTerm} months` : 'not set'}
- Net Financed: ${fmt$(enquiry.netAmountFinanced)}
- Deposit: ${fmt$(enquiry.deposit)}, Trade-in: ${fmt$(enquiry.tradeInValue)} / Owing: ${fmt$(enquiry.tradeInOwing)}
- Balloon: ${enquiry.balloonAmount ? `${fmt$(enquiry.balloonAmount)} (${fmtPct(enquiry.balloonPercent)})` : 'None'}

VEHICLE:
- ${vehicleDesc(enquiry)} | Type: ${enquiry.vehicleType || 'not set'}
- Sale: ${enquiry.saleType || 'not set'} | Dealer: ${enquiry.dealerName || 'not set'}
- Glass Guide Value: ${fmt$(enquiry.vehicleGlassValue)} | LTV: ${fmtPct(ltv)}

CLIENT:
- Employment: ${clientProfile.employmentStatus || 'unknown'} at ${clientProfile.employerName || 'unknown'} for ${clientProfile.employmentYears || '?'} years
- Income: ${fmt$(clientProfile.annualIncome)} p.a. | Other: ${fmt$(clientProfile.otherIncome)}
- Monthly expenses: ${fmt$(clientProfile.monthlyExpenses)} | Existing debts: ${fmt$(clientProfile.existingDebts)}/mth
- Credit Score: ${fmtScore(clientProfile.creditScore)} ${clientProfile.creditBureau ? `(${clientProfile.creditBureau})` : ''}
- Residency: ${clientProfile.residencyStatus || 'not specified'}

LENDER PANEL ELIGIBILITY (pre-computed against actual policy):
${lenderSummary}

Return JSON only (no markdown):
{
  "score": <0-100>,
  "grade": <"A+"|"A"|"B+"|"B"|"C+"|"C"|"D"|"F">,
  "summary": "<2-3 sentence broker-ready summary>",
  "strengths": ["..."],
  "risks": ["..."],
  "flags": ["short_flag_key"],
  "missingInfo": ["what is still needed"],
  "eligibleLenderCount": <number>,
  "bestAvailableRate": <number or null>,
  "recommendedLenderIds": ["lenderId — max 5"],
  "brokerNotes": "<specific action items>"
}`;

  const res = await client.messages.create({
    model: MODEL,
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  });

  return JSON.parse(res.content[0].text.trim().replace(/```json\n?|\n?```/g, ''));
};

// ── LENDER MATCHING ──────────────────────────────────────────

export const matchLenders = async (enquiry, clientProfile) => {
  const eligibilityReport = await buildLenderEligibilityReport(enquiry, clientProfile);
  const eligible = eligibilityReport.lenders.filter((l) => l.eligible);
  const ineligible = eligibilityReport.lenders.filter((l) => !l.eligible);

  const eligibleDetail = eligible
    .map(
      (l) =>
        `LENDER: ${l.lenderName} (ID: ${l.lenderId})
  Rate: ${l.rate ? `${l.rate.baseRate}% ${l.rate.rateType}${l.rate.compRate ? ` (comp ${l.rate.compRate}%)` : ''}` : 'No rate on file'}
  Credit tier: ${l.creditTier}
  ${l.guidelinesText ? `Policy notes: ${l.guidelinesText}` : ''}
  Flags: ${l.flags.length ? l.flags.join('; ') : 'None'}`
    )
    .join('\n\n');

  const prompt = `You are an experienced Australian car finance broker. Rank lenders for this application based on real eligibility data.

APPLICATION:
- Vehicle: ${vehicleDesc(enquiry)}
- Loan: ${fmt$(enquiry.loanAmount)} over ${enquiry.loanTerm || '?'} months | LTV: ${fmtPct(eligibilityReport.ltv)}
- Credit score: ${fmtScore(clientProfile.creditScore)} (${clientProfile.creditBureau || 'bureau unknown'})
- Employment: ${clientProfile.employmentStatus} | Sale type: ${enquiry.saleType}

ELIGIBLE LENDERS (${eligible.length}):
${eligibleDetail || 'None found'}

INELIGIBLE (${ineligible.length}):
${ineligible.map((l) => `  - ${l.lenderName}: ${l.flags.join('; ')}`).join('\n') || 'None'}

Return a JSON array only (no markdown):
[{
  "lenderId": "<id>",
  "lenderName": "<name>",
  "rank": <1-5>,
  "baseRate": <number or null>,
  "rateType": "<type>",
  "approvalLikelihood": "<High|Medium|Low>",
  "estimatedTurnaround": "<e.g. 24-48 hours>",
  "whyRecommended": "<1-2 sentence reason>",
  "conditionsToNote": "<conditions or null>",
  "exceptionRequired": <true|false>
}]`;

  const res = await client.messages.create({
    model: MODEL,
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  });

  const matches = JSON.parse(res.content[0].text.trim().replace(/```json\n?|\n?```/g, ''));
  return { matches, eligibilityReport };
};

// ── BROKER NARRATIVE ─────────────────────────────────────────

export const generateBrokerNarrative = async (enquiry, clientProfile, aiScore, topLender) => {
  const prompt = `You are an experienced Australian car finance broker writing a credit narrative to submit to a lender.

Write 3 paragraphs:
1. Borrower's employment and income situation
2. Vehicle purchase and loan structure
3. Address any risk factors — explain why this is a sound application

APPLICATION:
- Vehicle: ${vehicleDesc(enquiry)} | Sale: ${enquiry.saleType} ${enquiry.dealerName ? `at ${enquiry.dealerName}` : ''}
- Loan: ${fmt$(enquiry.loanAmount)} over ${enquiry.loanTerm} months | LTV: ${fmtPct(calculateCarLtv(enquiry))}
- Balloon: ${enquiry.balloonAmount ? `${fmt$(enquiry.balloonAmount)} (${enquiry.balloonPercent}%)` : 'Nil'}

CLIENT:
- ${clientProfile.employmentStatus} at ${clientProfile.employerName || 'current employer'} for ${clientProfile.employmentYears || '?'} years
- Income: ${fmt$(clientProfile.annualIncome)} p.a. | Credit: ${fmtScore(clientProfile.creditScore)}
- Existing debts: ${fmt$(clientProfile.existingDebts)}/month

FLAGS TO ADDRESS: ${aiScore?.flags?.join(', ') || 'None'}
STRENGTHS: ${aiScore?.strengths?.join(', ') || 'None noted'}
${topLender ? `SUBMITTING TO: ${topLender.lenderName} at ${topLender.baseRate}%` : ''}

Write in third person. Professional and factual. No markdown or headers.`;

  const res = await client.messages.create({
    model: MODEL,
    max_tokens: 600,
    messages: [{ role: 'user', content: prompt }],
  });

  return res.content[0].text.trim();
};

// ── DOCUMENT EXTRACTION ──────────────────────────────────────

export const extractDocumentData = async (documentType, documentContent) => {
  const instructions = {
    PAYSLIP: 'Extract: employer name, gross income (annual equivalent), pay period, payment date, YTD gross, employee name, ABN if shown',
    TAX_RETURN: 'Extract: taxable income, total income, tax year, lodgement date, tax agent name',
    NOA: 'Extract: taxable income, tax year, ATO reference number',
    BAS: 'Extract: total sales (G1), net GST, tax period, ABN',
    BANK_STATEMENT: 'Extract: account holder, BSB + last 4 digits of account only, avg monthly credits, avg monthly debits, closing balance, statement period, any dishonours or overdrafts',
    DEALER_INVOICE: 'Extract: dealer name, dealer ABN, vehicle make, model, year, VIN if shown, drive-away price, GST amount',
    REDBOOK_VALUATION: 'Extract: vehicle make, model, year, condition, trade value, private sale value, dealer retail value, valuation date',
    GLASS_VALUATION: 'Extract: vehicle make, model, year, condition, loan value, trade value, private value, retail value, valuation date',
    DRIVERS_LICENCE: 'Extract: full name, date of birth, licence number (last 4 digits only), state, expiry date, licence class',
    CREDIT_REPORT: 'Extract: credit score, bureau name, report date, number of defaults, default amounts, number of enquiries last 12 months, bankruptcies, judgements, clearouts',
  }[documentType] || 'Extract all relevant financial and identifying information for a car loan application';

  const res = await client.messages.create({
    model: MODEL,
    max_tokens: 512,
    messages: [{
      role: 'user',
      content: `You are a document extraction specialist for Australian car finance.\n\nDocument Type: ${documentType}\nInstructions: ${instructions}\n\nContent:\n${documentContent}\n\nReturn JSON only (no markdown). Use snake_case keys. Use null for missing fields. No $ signs in numbers. Dates as YYYY-MM-DD.`,
    }],
  });

  return JSON.parse(res.content[0].text.trim().replace(/```json\n?|\n?```/g, ''));
};

// ── BROKER CHAT ───────────────────────────────────────────────

export const brokerChat = async (messages, enquiryContext = null) => {
  const res = await client.messages.create({
    model: MODEL,
    max_tokens: 800,
    system: `You are an expert Australian car finance broker assistant with deep knowledge of lending policy, NCCP Act responsible lending obligations, vehicle valuation (Glass's Guide, RedBook), and lender appetite. Be concise and practical.${enquiryContext ? `\n\nCurrent enquiry:\n${JSON.stringify(enquiryContext, null, 2)}` : ''}`,
    messages,
  });

  return res.content[0].text;
};
