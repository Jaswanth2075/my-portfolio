const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/portfolioController');
const { protect } = require('../middleware/authMiddleware');

// Public route to view portfolio configuration
router.get('/', getProfile);

// Protected route to update portfolio configuration
router.put('/', protect, updateProfile);

module.exports = router;
