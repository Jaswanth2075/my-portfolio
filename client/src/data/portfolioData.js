export const initialProfileData = {
  name: "Jaswanth Naidu",
  title: "Full Stack Developer | AI/ML Enthusiast",
  headline: "Architecting intelligent full-stack systems and production-grade AI solutions.",
  status: "ONLINE / OPEN TO OPPORTUNITIES",
  location: "India",
  email: "admin@jaswanthnaidu.dev",
  github: "https://github.com/jaswanthnaidu",
  linkedin: "https://linkedin.com/in/jaswanthnaidu",
  resumeUrl: "/resume.pdf",
  bio: "Senior full-stack developer passionate about the intersection of scalable cloud backends, modern reactive interfaces, and cutting-edge Artificial Intelligence. Experienced in building robust distributed systems with Spring Boot, Node.js, React, and Python, with a strong focus on Generative AI, LLM-orchestrated RAG pipelines, and computer vision models.",
  education: [
    {
      degree: "Bachelor of Technology in Computer Science & Engineering",
      institution: "Reputed Engineering Institution",
      period: "2021 – 2025",
      grade: "First Class with Distinction",
      details: "Focused on Data Structures, Algorithms, Distributed Systems, Machine Learning, and Database Management Systems."
    }
  ],
  journey: "Started with low-level computing and core Java systems, rapidly expanding into high-concurrency Spring Boot microservices and modern React SPAs. Driven by curiosity in intelligent computation, deepened expertise into deep learning, computer vision, and modern Generative AI / RAG architectures to engineer practical, impact-driven software.",
  careerObjectives: "To leverage end-to-end full-stack software craftsmanship alongside advanced Generative AI and Machine Learning to engineer resilient, high-impact products that solve complex real-world challenges at scale."
};

export const skillsData = [
  {
    category: "Programming Languages",
    icon: "Code2",
    description: "Core languages for enterprise backend systems, rapid scripts, and high-performance algorithms.",
    skills: [
      { name: "Java", level: 90, tag: "Enterprise / Spring" },
      { name: "JavaScript", level: 92, tag: "ES6+ / Async" },
      { name: "Python", level: 88, tag: "AI/ML / Scripting" },
      { name: "SQL", level: 85, tag: "Complex Queries / RDBMS" }
    ]
  },
  {
    category: "Frontend Development",
    icon: "Layout",
    description: "Responsive, accessible, and high-performance user interfaces with modern toolchains.",
    skills: [
      { name: "React.js", level: 94, tag: "Hooks / SPA / Context" },
      { name: "Angular", level: 82, tag: "TypeScript / RxJS" },
      { name: "HTML5", level: 95, tag: "Semantic / Accessible" },
      { name: "CSS3", level: 92, tag: "Flexbox / Grid / Animations" },
      { name: "Tailwind CSS", level: 95, tag: "Utility-first / Responsive" }
    ]
  },
  {
    category: "Backend Development",
    icon: "Server",
    description: "Scalable REST APIs, event-driven services, and secure server architectures.",
    skills: [
      { name: "Node.js", level: 90, tag: "Event Loop / Streams" },
      { name: "Express.js", level: 92, tag: "MVC / Middleware / Auth" },
      { name: "Spring Boot", level: 86, tag: "Microservices / JPA" },
      { name: "REST APIs", level: 95, tag: "RESTful / JWT / OAuth2" }
    ]
  },
  {
    category: "Databases & Storage",
    icon: "Database",
    description: "Relational modeling, NoSQL document stores, indexing, and query optimization.",
    skills: [
      { name: "MongoDB", level: 88, tag: "NoSQL / Mongoose ODM" },
      { name: "MySQL", level: 85, tag: "Relational / ACID" },
      { name: "PostgreSQL", level: 82, tag: "Advanced RDBMS / JSONB" }
    ]
  },
  {
    category: "Artificial Intelligence & ML",
    icon: "Cpu",
    description: "Machine learning workflows, computer vision enhancement, and Generative AI pipelines.",
    skills: [
      { name: "Machine Learning", level: 86, tag: "Scikit-Learn / Predictive" },
      { name: "Deep Learning", level: 82, tag: "Neural Nets / PyTorch" },
      { name: "Generative AI", level: 85, tag: "LLMs / Prompt Engineering" },
      { name: "NLP", level: 84, tag: "Tokenization / Embeddings" },
      { name: "RAG Applications", level: 88, tag: "Vector DBs / Context Injection" }
    ]
  },
  {
    category: "Developer Tools & DevOps",
    icon: "Terminal",
    description: "Essential toolchains ensuring maintainability, version control, and rapid API testing.",
    skills: [
      { name: "Git", level: 92, tag: "Branching / Merge / Rebase" },
      { name: "GitHub", level: 90, tag: "Actions / CI/CD / PRs" },
      { name: "VS Code", level: 95, tag: "Extensions / Debugging" },
      { name: "Postman", level: 92, tag: "API Testing / Mocking" }
    ]
  }
];

export const initialProjectsData = [
  {
    _id: "p-01",
    title: "GoTrain",
    fileName: "GoTrainSystem.java",
    shortDescription: "Enterprise railway reservation and booking system built with Java, Spring Boot, Angular, and MySQL.",
    fullDescription: "GoTrain is a full-featured railway reservation platform engineered for high-concurrency ticket booking, seat allocation algorithms, schedule querying, and passenger profile management. Features atomic database transactions, role-based authorization for passengers and railway admins, and real-time PNR tracking.",
    technologies: ["Java", "Spring Boot", "Angular", "MySQL", "REST APIs", "Spring Security", "JWT"],
    features: [
      "Real-time train schedule search and dynamic seat availability mapping",
      "Atomic reservation transactions preventing overbooking and race conditions",
      "PNR status enquiry and passenger ticket generation",
      "Administrative dashboard for route management, train schedules, and fare matrix",
      "Secure JWT authentication and role-based access control (RBAC)"
    ],
    architecture: "Multi-tier microservices architecture with Spring Boot REST services exposing secured endpoints to an Angular SPA, backed by relational MySQL schema with indexing for fast lookups.",
    githubLink: "https://github.com/jaswanthnaidu/gotrain-booking-system",
    liveDemoLink: "https://gotrain-demo.vercel.app",
    featured: true,
    thumbnail: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=800&q=80",
    createdAt: "2024-03-15"
  },
  {
    _id: "p-02",
    title: "Emergency Response FAQ Chatbot",
    fileName: "emergency_rag_agent.py",
    shortDescription: "Safety-critical question-answering assistant powered by Python, Streamlit, NLP, RAG, and LLM orchestration.",
    fullDescription: "An intelligent, high-reliability emergency response FAQ assistant engineered to provide instant, validated medical and disaster relief guidance. Leverages Retrieval-Augmented Generation (RAG) with vector embeddings to ensure responses strictly adhere to authoritative medical and emergency services manuals.",
    technologies: ["Python", "Streamlit", "NLP", "RAG", "LLM", "Vector DB", "LangChain"],
    features: [
      "Authoritative document retrieval using dense vector similarity search",
      "Strict safety-focused fallback mechanisms when queries fall outside validated context",
      "Zero-hallucination source attribution citing exact protocol handbook sections",
      "Fast Streamlit interactive chat UI with offline caching of emergency protocols",
      "Latency-optimized inference pipeline for urgent incident queries"
    ],
    architecture: "Document ingestion pipeline embedding emergency protocols into a vector store; user queries undergo semantic retrieval before passing verified context to an LLM with strict guardrails.",
    githubLink: "https://github.com/jaswanthnaidu/emergency-response-faq-chatbot",
    liveDemoLink: "https://emergency-bot.streamlit.app",
    featured: true,
    thumbnail: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=800&q=80",
    createdAt: "2024-06-20"
  },
  {
    _id: "p-03",
    title: "Underwater Image Enhancement and Quality Assessment",
    fileName: "underwater_uif_eval.py",
    shortDescription: "UIF-based computer vision system for underwater optical correction and objective image quality assessment.",
    fullDescription: "A specialized computer vision and machine learning framework designed to mitigate underwater optical degradation (light scattering, color cast, low contrast, haze). Employs Underwater Image Fusion (UIF) techniques combined with machine learning regression to quantify enhancement metrics (UIQM, UCIQE, PSNR).",
    technologies: ["Python", "Computer Vision", "Machine Learning", "OpenCV", "UIF", "Scikit-Learn", "NumPy"],
    features: [
      "Multi-scale Underwater Image Fusion (UIF) algorithm restoring natural color fidelity",
      "Deep contrast stretching and white balancing compensation pipelines",
      "Objective quality metric evaluation computing UIQM (Underwater Image Quality Measure)",
      "Automated batch processing module for oceanographic research datasets",
      "Comparative analysis engine contrasting raw degraded inputs against enhanced outputs"
    ],
    architecture: "Dual-stream image processing pipeline combining classical white-balance / homomorphic filtering with ML-predicted perceptual quality scores to dynamically tune enhancement weights.",
    githubLink: "https://github.com/jaswanthnaidu/underwater-image-enhancement-quality-assessment",
    liveDemoLink: "https://underwater-enhancer-cv.vercel.app",
    featured: true,
    thumbnail: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    createdAt: "2024-09-10"
  }
];

export const timelineData = [
  {
    type: "experience",
    title: "Full Stack Developer Intern",
    organization: "Tech Innovation Labs",
    period: "2024 – Present",
    location: "Remote / Hybrid",
    description: "Engineered scalable RESTful microservices and reactive frontend interfaces. Implemented real-time telemetry dashboards and integrated automated testing pipelines reducing regression bugs by 35%.",
    highlights: ["React.js", "Node.js", "Express", "REST APIs", "Git CI/CD"]
  },
  {
    type: "internship",
    title: "AI & Machine Learning Research Intern",
    organization: "Advanced Data Systems",
    period: "2023 – 2024",
    location: "Onsite",
    description: "Researched computer vision algorithms and automated document question-answering systems using deep learning models. Conducted performance benchmarking and hyperparameter optimization.",
    highlights: ["Python", "Computer Vision", "PyTorch", "RAG", "Data Pipelines"]
  },
  {
    type: "certification",
    title: "NPTEL Elite Certification: Programming in Java",
    organization: "NPTEL / IIT Kharagpur",
    period: "Certified",
    location: "Online",
    description: "Awarded Elite classification for comprehensive mastery over object-oriented programming, multithreading, collections framework, socket programming, and database connectivity in Java.",
    highlights: ["Core Java", "OOP", "Concurrency", "Collections", "JDBC"]
  },
  {
    type: "certification",
    title: "NPTEL Elite Certification: Deep Learning & Neural Networks",
    organization: "NPTEL / IIT Madras",
    period: "Certified",
    location: "Online",
    description: "Deep dive into convolutional neural networks (CNNs), recurrent neural networks (RNNs), optimization algorithms, backpropagation mathematics, and generative architectures.",
    highlights: ["Deep Learning", "CNN", "RNN", "Loss Functions", "Optimization"]
  },
  {
    type: "achievement",
    title: "National Hackathon Finalist & Best Technical Innovation",
    organization: "Smart Hackathon Summit",
    period: "2024",
    location: "National Level",
    description: "Led a 4-person development team to architect and build an automated emergency response dispatching system in 36 continuous hours, winning Best Technical Innovation honors.",
    highlights: ["Team Lead", "System Design", "Rapid Prototyping", "Public Speaking"]
  }
];
