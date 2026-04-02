import { Router } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { prisma } from '../lib/prisma.js';
import { AppError } from '../middleware/errorHandler.js';

const router = Router();

const hashPassword = (password) =>
  crypto.createHash('sha256').update(password + process.env.JWT_SECRET).digest('hex');

const signToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

// Register
router.post('/register', async (req, res, next) => {
  try {
    const { email, name, phone, password, role = 'CLIENT' } = req.body;
    if (!email || !name || !password) throw new AppError('email, name and password are required', 400);

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) throw new AppError('Email already registered', 409);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        phone,
        role,
        passwordHash: hashPassword(password),
      },
    });

    // Auto-create client profile
    if (role === 'CLIENT') {
      await prisma.client.create({ data: { userId: user.id } });
    }

    const token = signToken(user.id);
    res.status(201).json({
      success: true,
      data: { token, user: { id: user.id, email: user.email, name: user.name, role: user.role } },
    });
  } catch (err) {
    next(err);
  }
});

// Login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new AppError('email and password are required', 400);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.passwordHash !== hashPassword(password)) {
      throw new AppError('Invalid email or password', 401);
    }

    const token = signToken(user.id);
    res.json({
      success: true,
      data: { token, user: { id: user.id, email: user.email, name: user.name, role: user.role } },
    });
  } catch (err) {
    next(err);
  }
});

// Me
router.get('/me', async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) throw new AppError('No token', 401);
    const decoded = jwt.verify(authHeader.split(' ')[1], process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, name: true, phone: true, role: true },
    });
    if (!user) throw new AppError('User not found', 404);
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
});

export default router;
