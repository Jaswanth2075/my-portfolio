const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema(
  {
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    period: { type: String, required: true },
    grade: { type: String, default: '' },
    details: { type: String, default: '' }
  },
  { _id: false }
);

const PortfolioProfileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: 'Jaswanth Naidu'
    },
    title: {
      type: String,
      required: true,
      default: 'Full Stack Developer | AI/ML Enthusiast'
    },
    headline: {
      type: String,
      default: 'Architecting intelligent full-stack systems and production-grade AI solutions.'
    },
    status: {
      type: String,
      default: 'ONLINE / OPEN TO OPPORTUNITIES'
    },
    location: {
      type: String,
      default: 'India'
    },
    email: {
      type: String,
      default: 'admin@jaswanthnaidu.dev'
    },
    github: {
      type: String,
      default: 'https://github.com/jaswanthnaidu'
    },
    linkedin: {
      type: String,
      default: 'https://linkedin.com/in/jaswanthnaidu'
    },
    resumeUrl: {
      type: String,
      default: '/resume.pdf'
    },
    bio: {
      type: String,
      default: 'Senior full-stack developer passionate about the intersection of scalable cloud backends, modern reactive interfaces, and cutting-edge Artificial Intelligence.'
    },
    journey: {
      type: String,
      default: 'Started with low-level computing and core Java systems, expanding into high-concurrency Spring Boot microservices, modern React SPAs, and Generative AI.'
    },
    careerObjectives: {
      type: String,
      default: 'To leverage end-to-end full-stack software craftsmanship alongside advanced Generative AI and Machine Learning to engineer resilient, high-impact products.'
    },
    education: {
      type: [EducationSchema],
      default: []
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('PortfolioProfile', PortfolioProfileSchema);
