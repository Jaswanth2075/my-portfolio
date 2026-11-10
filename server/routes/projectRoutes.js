const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  uploadThumbnail
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Public project routes
router.get('/', getProjects);
router.get('/:id', getProjectById);

// Protected administrative project routes
router.post('/', protect, createProject);
router.put('/:id', protect, updateProject);
router.delete('/:id', protect, deleteProject);
router.post('/upload', protect, upload.single('thumbnail'), uploadThumbnail);

module.exports = router;
