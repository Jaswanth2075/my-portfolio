const PortfolioProfile = require('../models/PortfolioProfile');

// @desc    Get portfolio metadata & profile
// @route   GET /api/portfolio
// @access  Public
const getProfile = async (req, res, next) => {
  try {
    let profile = await PortfolioProfile.findOne();

    // If profile hasn't been created yet, return default
    if (!profile) {
      profile = await PortfolioProfile.create({});
    }

    res.status(200).json({
      success: true,
      data: profile
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update portfolio metadata & profile
// @route   PUT /api/portfolio
// @access  Private (Admin)
const updateProfile = async (req, res, next) => {
  try {
    let profile = await PortfolioProfile.findOne();

    if (!profile) {
      profile = await PortfolioProfile.create(req.body);
    } else {
      profile = await PortfolioProfile.findByIdAndUpdate(profile._id, req.body, {
        new: true,
        runValidators: true
      });
    }

    res.status(200).json({
      success: true,
      message: 'Portfolio profile updated successfully',
      data: profile
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile
};
