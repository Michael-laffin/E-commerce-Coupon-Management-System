import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getDb } from '../database.js';
import { authenticateToken } from '../middleware/auth.js';
import { generateCouponCode } from '../utils/couponGenerator.js';

const router = express.Router();

// Get all coupons
router.get('/', authenticateToken, async (req, res) => {
  const db = getDb();
  const coupons = await db.all('SELECT * FROM coupons ORDER BY created_at DESC');
  res.json(coupons);
});

// Create new coupon
router.post('/', authenticateToken, async (req, res) => {
  const {
    discount_type,
    discount_value,
    expiration_date,
    usage_limit,
    customer_type
  } = req.body;

  const code = generateCouponCode();
  const id = uuidv4();

  try {
    const db = getDb();
    await db.run(
      `INSERT INTO coupons (id, code, discount_type, discount_value, expiration_date, usage_limit, customer_type)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, code, discount_type, discount_value, expiration_date, usage_limit, customer_type]
    );

    const coupon = await db.get('SELECT * FROM coupons WHERE id = ?', id);
    res.status(201).json(coupon);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create coupon' });
  }
});

// Validate and use coupon
router.post('/validate', authenticateToken, async (req, res) => {
  const { code, user_id, order_value } = req.body;
  const db = getDb();

  try {
    const coupon = await db.get('SELECT * FROM coupons WHERE code = ?', code);
    
    if (!coupon) {
      return res.status(404).json({ error: 'Coupon not found' });
    }

    // Check expiration
    if (coupon.expiration_date && new Date(coupon.expiration_date) < new Date()) {
      return res.status(400).json({ error: 'Coupon has expired' });
    }

    // Check usage limit
    const usageCount = await db.get(
      'SELECT COUNT(*) as count FROM coupon_usage WHERE coupon_id = ?',
      coupon.id
    );

    if (coupon.usage_limit && usageCount.count >= coupon.usage_limit) {
      return res.status(400).json({ error: 'Coupon usage limit reached' });
    }

    // Record usage
    await db.run(
      `INSERT INTO coupon_usage (id, coupon_id, user_id, order_value)
       VALUES (?, ?, ?, ?)`,
      [uuidv4(), coupon.id, user_id, order_value]
    );

    res.json({ ...coupon, valid: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to validate coupon' });
  }
});

export default router;