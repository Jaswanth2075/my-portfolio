const rateLimit = require('express-rate-limit');

// Strict limiter for authentication login endpoint to protect against brute force
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Max 10 requests per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many authentication attempts from this IP. Please try again after 15 minutes.'
  }
});

// Limiter for public contact form submissions to prevent spamming
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 6, // Max 6 messages per IP per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Message rate limit exceeded. Please wait a few minutes before submitting another transmission.'
  }
});

// General API request limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests across API endpoints. Please try again later.'
  }
});

module.exports = {
  authLimiter,
  contactLimiter,
  apiLimiter
};
