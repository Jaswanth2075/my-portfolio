const Admin = require('../models/Admin');
const generateToken = require('../utils/generateToken');
const { isValidEmail } = require('../utils/validators');

// @desc    Authenticate admin & return JWT
// @route   POST /api/auth/login
// @access  Public
const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password'
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email format'
      });
    }

    // Explicitly select password since it has select: false
    const admin = await Admin.findOne({ email: email.toLowerCase() }).select('+password');

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid administrative credentials'
      });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid administrative credentials'
      });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    const token = generateToken(admin._id, admin.role);

    res.status(200).json({
      success: true,
      message: 'Admin authentication successful',
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        lastLogin: admin.lastLogin
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Admin logout confirmation
// @route   POST /api/auth/logout
// @access  Public
const logoutAdmin = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Admin session terminated successfully'
  });
};

// @desc    Get current authenticated admin user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.user.id).select('-password');
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin user not found'
      });
    }

    res.status(200).json({
      success: true,
      data: admin
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginAdmin,
  logoutAdmin,
  getMe
};
