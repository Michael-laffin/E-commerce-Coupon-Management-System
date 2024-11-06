import express from 'express';
import { getDb } from '../database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get overall analytics
router.get('/overview', authenticateToken, async (req, res) => {
  const db = getDb();
  
  try {
    const [totalCoupons, totalUsage, conversionRate] = await Promise.all([
      db.get('SELECT COUNT(*) as count FROM coupons'),
      db.get('SELECT COUNT(*) as count FROM coupon_usage'),
      db.get(`
        SELECT 
          ROUND(CAST(COUNT(DISTINCT cu.id) AS FLOAT) / 
          CAST(COUNT(DISTINCT c.id) AS FLOAT) * 100, 2) as rate
        FROM coupons c
        LEFT JOIN coupon_usage cu ON c.id = cu.coupon_id
      `)
    ]);

    res.json({
      totalCoupons: totalCoupons.count,
      totalUsage: totalUsage.count,
      conversionRate: conversionRate.rate
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// Get usage by customer type
router.get('/customer-segments', authenticateToken, async (req, res) => {
  const db = getDb();
  
  try {
    const segments = await db.all(`
      SELECT 
        c.customer_type,
        COUNT(cu.id) as usage_count,
        AVG(cu.order_value) as avg_order_value
      FROM coupons c
      LEFT JOIN coupon_usage cu ON c.id = cu.coupon_id
      GROUP BY c.customer_type
    `);

    res.json(segments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch customer segments' });
  }
});

// Get usage over time
router.get('/usage-timeline', authenticateToken, async (req, res) => {
  const db = getDb();
  const { period = 'daily' } = req.query;
  
  let timeFormat;
  switch (period) {
    case 'weekly':
      timeFormat = "strftime('%Y-%W', used_at)";
      break;
    case 'monthly':
      timeFormat = "strftime('%Y-%m', used_at)";
      break;
    default:
      timeFormat = "strftime('%Y-%m-%d', used_at)";
  }

  try {
    const timeline = await db.all(`
      SELECT 
        ${timeFormat} as time_period,
        COUNT(*) as usage_count,
        SUM(order_value) as total_order_value
      FROM coupon_usage
      GROUP BY time_period
      ORDER BY time_period DESC
      LIMIT 30
    `);

    res.json(timeline);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch usage timeline' });
  }
});

export default router;