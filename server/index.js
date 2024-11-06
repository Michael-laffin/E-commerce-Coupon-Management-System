import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { setupDatabase } from './database.js';
import authRoutes from './routes/auth.js';
import couponRoutes from './routes/coupons.js';
import analyticsRoutes from './routes/analytics.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || 3000;

// Configure CORS
app.use(cors({
  origin: 'http://localhost:5173', // Vite dev server default port
  credentials: true
}));

app.use(express.json());

// Configure trust proxy if behind a reverse proxy
app.set('trust proxy', 1);

// Rate limiting with custom key generator
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  keyGenerator: (req) => {
    // Use X-Forwarded-For header, remote address, or a default value
    return req.headers['x-forwarded-for'] || 
           req.socket.remoteAddress || 
           'unknown';
  },
  handler: (req, res) => {
    res.status(429).json({
      error: 'Too many requests, please try again later.'
    });
  }
});

app.use(limiter);

// Initialize database
await setupDatabase();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/analytics', analyticsRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '../dist')));
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../dist/index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});