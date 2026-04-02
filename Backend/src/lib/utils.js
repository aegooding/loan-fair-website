import { prisma } from './prisma.js';

// Generate a unique enquiry reference e.g. LF-2025-04821
export const generateReference = () => {
  const year = new Date().getFullYear();
  const rand = Math.floor(10000 + Math.random() * 90000);
  return `LF-${year}-${rand}`;
};

// Audit logging helper
export const logAudit = async (userId, action, entityId, entityType, meta = null) => {
  try {
    await prisma.auditLog.create({
      data: { userId, action, entityId, entityType, meta },
    });
  } catch (err) {
    console.error('Audit log failed:', err.message);
  }
};
