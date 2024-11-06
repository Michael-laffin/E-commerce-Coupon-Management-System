import jwt from 'jsonwebtoken';
import { getDb } from '../database.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const db = getDb();
    
    const user = await db.get(
      'SELECT id, email, role FROM users WHERE id = ?',
      decoded.userId
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
}