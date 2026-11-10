const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters']
    },
    fileName: {
      type: String,
      trim: true,
      default: function () {
        return `${this.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.ts`;
      }
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true,
      maxlength: [300, 'Short description cannot exceed 300 characters']
    },
    fullDescription: {
      type: String,
      trim: true
    },
    technologies: {
      type: [String],
      required: [true, 'At least one technology is required'],
      validate: {
        validator: function (val) {
          return val && val.length > 0;
        },
        message: 'A project must have at least one technology specified'
      }
    },
    features: {
      type: [String],
      default: []
    },
    architecture: {
      type: String,
      trim: true
    },
    githubLink: {
      type: String,
      trim: true,
      default: ''
    },
    liveDemoLink: {
      type: String,
      trim: true,
      default: ''
    },
    thumbnail: {
      type: String,
      trim: true,
      default: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
    },
    featured: {
      type: Boolean,
      default: true
    },
    order: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Project', ProjectSchema);
