const Project = require('../models/Project');

// @desc    Get all showcased projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single project by ID
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: `Project not found with ID ${req.params.id}`
      });
    }

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private (Admin)
const createProject = async (req, res, next) => {
  try {
    const {
      title,
      fileName,
      shortDescription,
      fullDescription,
      technologies,
      features,
      architecture,
      githubLink,
      liveDemoLink,
      thumbnail,
      featured,
      order
    } = req.body;

    if (!title || !shortDescription) {
      return res.status(400).json({
        success: false,
        message: 'Title and short description are required fields'
      });
    }

    // Ensure technologies is array
    let techArray = technologies;
    if (typeof technologies === 'string') {
      techArray = technologies.split(',').map((t) => t.trim()).filter(Boolean);
    }

    const project = await Project.create({
      title,
      fileName,
      shortDescription,
      fullDescription,
      technologies: techArray || ['General'],
      features: Array.isArray(features) ? features : [],
      architecture,
      githubLink,
      liveDemoLink,
      thumbnail: thumbnail || undefined,
      featured: featured !== undefined ? featured : true,
      order: order !== undefined ? Number(order) : 0
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update an existing project
// @route   PUT /api/projects/:id
// @access  Private (Admin)
const updateProject = async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: `Project not found with ID ${req.params.id}`
      });
    }

    const updateData = { ...req.body };

    // Format technologies if sent as string
    if (typeof updateData.technologies === 'string') {
      updateData.technologies = updateData.technologies
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
    }

    project = await Project.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private (Admin)
const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: `Project not found with ID ${req.params.id}`
      });
    }

    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload project thumbnail
// @route   POST /api/projects/upload
// @access  Private (Admin)
const uploadThumbnail = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No file uploaded or invalid file format'
    });
  }

  const fileUrl = `/uploads/${req.file.filename}`;

  res.status(200).json({
    success: true,
    message: 'Thumbnail uploaded successfully',
    url: fileUrl,
    filename: req.file.filename
  });
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  uploadThumbnail
};
