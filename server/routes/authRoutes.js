const express = require('express');
const router = express.Router();
const { loginAdmin, logoutAdmin, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { authLimiter } = require('../middleware/rateLimiter');

// Public login with brute-force rate limiter
router.post('/login', authLimiter, loginAdmin);

// Public logout
router.post('/logout', logoutAdmin);

// Protected me check
router.get('/me', protect, getMe);

module.exports = router;
