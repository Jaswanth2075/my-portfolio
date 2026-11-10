const express = require('express');
const router = express.Router();
const {
  submitContactMessage,
  getContactMessages,
  updateContactMessage,
  deleteContactMessage
} = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');
const { contactLimiter } = require('../middleware/rateLimiter');

// Public contact submission with rate limiting
router.post('/', contactLimiter, submitContactMessage);

// Protected administrative messages routes
router.get('/', protect, getContactMessages);
router.patch('/:id', protect, updateContactMessage);
router.delete('/:id', protect, deleteContactMessage);

module.exports = router;
