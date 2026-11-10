const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const Project = require('../models/Project');
const PortfolioProfile = require('../models/PortfolioProfile');
const connectDB = require('../config/db');

dotenv.config();

const initialProjects = [
  {
    title: 'GoTrain',
    fileName: 'GoTrainSystem.java',
    shortDescription: 'Enterprise railway reservation and booking system built with Java, Spring Boot, Angular, and MySQL.',
    fullDescription: 'GoTrain is a full-featured railway reservation platform engineered for high-concurrency ticket booking, seat allocation algorithms, schedule querying, and passenger profile management. Features atomic database transactions, role-based authorization for passengers and railway admins, and real-time PNR tracking.',
    technologies: ['Java', 'Spring Boot', 'Angular', 'MySQL', 'REST APIs', 'Spring Security', 'JWT'],
    features: [
      'Real-time train schedule search and dynamic seat availability mapping',
      'Atomic reservation transactions preventing overbooking and race conditions',
      'PNR status enquiry and passenger ticket generation',
      'Administrative dashboard for route management, train schedules, and fare matrix',
      'Secure JWT authentication and role-based access control (RBAC)'
    ],
    architecture: 'Multi-tier microservices architecture with Spring Boot REST services exposing secured endpoints to an Angular SPA, backed by relational MySQL schema with indexing for fast lookups.',
    githubLink: 'https://github.com/jaswanthnaidu/gotrain-booking-system',
    liveDemoLink: 'https://gotrain-demo.vercel.app',
    featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=800&q=80',
    order: 1
  },
  {
    title: 'Emergency Response FAQ Chatbot',
    fileName: 'emergency_rag_agent.py',
    shortDescription: 'Safety-critical question-answering assistant powered by Python, Streamlit, NLP, RAG, and LLM orchestration.',
    fullDescription: 'An intelligent, high-reliability emergency response FAQ assistant engineered to provide instant, validated medical and disaster relief guidance. Leverages Retrieval-Augmented Generation (RAG) with vector embeddings to ensure responses strictly adhere to authoritative medical and emergency services manuals.',
    technologies: ['Python', 'Streamlit', 'NLP', 'RAG', 'LLM', 'Vector DB', 'LangChain'],
    features: [
      'Authoritative document retrieval using dense vector similarity search',
      'Strict safety-focused fallback mechanisms when queries fall outside validated context',
      'Zero-hallucination source attribution citing exact protocol handbook sections',
      'Fast Streamlit interactive chat UI with offline caching of emergency protocols',
      'Latency-optimized inference pipeline for urgent incident queries'
    ],
    architecture: 'Document ingestion pipeline embedding emergency protocols into a vector store; user queries undergo semantic retrieval before passing verified context to an LLM with strict guardrails.',
    githubLink: 'https://github.com/jaswanthnaidu/emergency-response-faq-chatbot',
    liveDemoLink: 'https://emergency-bot.streamlit.app',
    featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=800&q=80',
    order: 2
  },
  {
    title: 'Underwater Image Enhancement and Quality Assessment',
    fileName: 'underwater_uif_eval.py',
    shortDescription: 'UIF-based computer vision system for underwater optical correction and objective image quality assessment.',
    fullDescription: 'A specialized computer vision and machine learning framework designed to mitigate underwater optical degradation (light scattering, color cast, low contrast, haze). Employs Underwater Image Fusion (UIF) techniques combined with machine learning regression to quantify enhancement metrics (UIQM, UCIQE, PSNR).',
    technologies: ['Python', 'Computer Vision', 'Machine Learning', 'OpenCV', 'UIF', 'Scikit-Learn', 'NumPy'],
    features: [
      'Multi-scale Underwater Image Fusion (UIF) algorithm restoring natural color fidelity',
      'Deep contrast stretching and white balancing compensation pipelines',
      'Objective quality metric evaluation computing UIQM (Underwater Image Quality Measure)',
      'Automated batch processing module for oceanographic research datasets',
      'Comparative analysis engine contrasting raw degraded inputs against enhanced outputs'
    ],
    architecture: 'Dual-stream image processing pipeline combining classical white-balance / homomorphic filtering with ML-predicted perceptual quality scores to dynamically tune enhancement weights.',
    githubLink: 'https://github.com/jaswanthnaidu/underwater-image-enhancement-quality-assessment',
    liveDemoLink: 'https://underwater-enhancer-cv.vercel.app',
    featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    order: 3
  }
];

const seedDatabase = async () => {
  try {
    console.log('--- Initializing Database Seeder ---');

    // 1. Seed or Verify Admin
    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@jaswanthnaidu.dev').toLowerCase();
    const existingAdmin = await Admin.findOne({ email: adminEmail });

    if (!existingAdmin) {
      const adminPassword = process.env.ADMIN_PASSWORD || 'AdminSecurePassword123!';
      const newAdmin = await Admin.create({
        name: process.env.ADMIN_NAME || 'Jaswanth Naidu',
        email: adminEmail,
        password: adminPassword,
        role: 'admin'
      });
      console.log(`[Seed] Default Admin created: ${newAdmin.email}`);
    } else {
      console.log(`[Seed] Admin already exists: ${existingAdmin.email}`);
    }

    // 2. Seed Showcased Projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.insertMany(initialProjects);
      console.log(`[Seed] Successfully seeded ${initialProjects.length} showcase projects.`);
    } else {
      console.log(`[Seed] Projects collection already has ${projectCount} items. Skipping.`);
    }

    // 3. Seed Portfolio Profile
    const profileCount = await PortfolioProfile.countDocuments();
    if (profileCount === 0) {
      await PortfolioProfile.create({
        name: process.env.ADMIN_NAME || 'Jaswanth Naidu',
        email: adminEmail,
        title: 'Full Stack Developer | AI/ML Enthusiast',
        headline: 'Architecting intelligent full-stack systems and production-grade AI solutions.',
        education: [
          {
            degree: 'Bachelor of Technology in Computer Science & Engineering',
            institution: 'Reputed Engineering Institution',
            period: '2021 – 2025',
            grade: 'First Class with Distinction',
            details: 'Focused on Distributed Systems, Algorithms, Machine Learning, and Cloud Architectures.'
          }
        ]
      });
      console.log('[Seed] Portfolio profile initialized.');
    }

    console.log('--- Database Seeding Complete ---');
  } catch (error) {
    console.error('[Seed Error]:', error.message);
  }
};

// If run directly as a script: node seedService.js
if (require.main === module) {
  (async () => {
    await connectDB();
    await seedDatabase();
    process.exit(0);
  })();
}

module.exports = seedDatabase;
