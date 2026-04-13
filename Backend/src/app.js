import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import authRoutes from './routes/auth.js';
import enquiryRoutes from './routes/enquiries.js';
import contactRoutes from './routes/contact.js';
import lenderRoutes from './routes/lenders.js';
import { crmRouter as crmRoutes, aiRouter as aiRoutes, webhookRouter as webhookRoutes, clientsRouter as clientRoutes, documentsRouter as documentRoutes, applicationsRouter as applicationRoutes, reportsRouter as reportRoutes } from './routes/other.js';

import { errorHandler } from './middleware/errorHandler.js';
import { authenticate } from './middleware/auth.js';

const app = express();

// ── Security & Middleware ──────────────────────────
app.use(helmet());
const ALLOWED_ORIGINS = [
  'https://www.loanfair.com.au',
  'https://loanfair.com.au',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || origin.startsWith('http://localhost:') || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 });
app.use('/api/', limiter);

// ── Routes ────────────────────────────────────────
app.use('/api/v1/auth', authRoutes);

// Inbound webhooks (no auth — verified by signature)
app.use('/api/v1/webhooks', webhookRoutes);

// All other routes require authentication
app.use('/api/v1/clients', authenticate, clientRoutes);
app.use('/api/v1/enquiries', authenticate, enquiryRoutes);
app.use('/api/v1/documents', authenticate, documentRoutes);
app.use('/api/v1/applications', authenticate, applicationRoutes);
app.use('/api/v1/lenders', authenticate, lenderRoutes);
app.use('/api/v1/crm', authenticate, crmRoutes);
app.use('/api/v1/ai', authenticate, aiRoutes);
app.use('/api/v1/reports', authenticate, reportRoutes);

// Contact form (no auth required)
app.use('/api/v1/contact', contactRoutes);

// Health check
app.get('/health', (req, res) =>
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
);

// Global error handler
app.use(errorHandler);

export default app;
