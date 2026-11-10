const ContactMessage = require('../models/ContactMessage');
const { isValidEmail } = require('../utils/validators');

// @desc    Submit a new contact transmission
// @route   POST /api/contact
// @access  Public (Rate-limited)
const submitContactMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate inputs
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields (name, email, subject, message) are required'
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email format'
      });
    }

    if (message.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Message payload must contain at least 10 characters'
      });
    }

    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';

    const newContact = await ContactMessage.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
      ipAddress: String(clientIp).slice(0, 50)
    });

    res.status(201).json({
      success: true,
      message: 'Transmission received and logged successfully. I will get back to you shortly!',
      data: {
        id: newContact._id,
        createdAt: newContact.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private (Admin)
const getContactMessages = async (req, res, next) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update message read status
// @route   PATCH /api/contact/:id
// @access  Private (Admin)
const updateContactMessage = async (req, res, next) => {
  try {
    const message = await ContactMessage.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: `Message not found with ID ${req.params.id}`
      });
    }

    if (req.body.read !== undefined) {
      message.read = Boolean(req.body.read);
    }

    await message.save();

    res.status(200).json({
      success: true,
      message: 'Message status updated',
      data: message
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a contact message
// @route   DELETE /api/contact/:id
// @access  Private (Admin)
const deleteContactMessage = async (req, res, next) => {
  try {
    const message = await ContactMessage.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: `Message not found with ID ${req.params.id}`
      });
    }

    await message.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Message permanently removed from database',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitContactMessage,
  getContactMessages,
  updateContactMessage,
  deleteContactMessage
};
