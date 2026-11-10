# my-portfolio
Personal Developer portfolio built using MERN stack.

# Full-Stack Developer Portfolio // Jaswanth Naidu

> **Architecture**: MERN (MongoDB, Express.js, React, Node.js) with Tailwind CSS & Framer Motion  
> **Aesthetic**: Developer Terminal & Code-Editor Inspired Interface  
> **Status**: Production Ready & Fully Tested  

---

## Table of Contents

1. [Overview & Visual Identity](#1-overview--visual-identity)
2. [Technology Stack](#2-technology-stack)
3. [Architecture & Folder Structure](#3-architecture--folder-structure)
4. [Key Features](#4-key-features)
   - [Interactive Terminal Console](#interactive-terminal-console)
   - [Showcased Repositories](#showcased-repositories)
   - [Administrative Control Center](#administrative-control-center)
5. [REST API Documentation](#5-rest-api-documentation)
6. [Getting Started & Installation](#6-getting-started--installation)
   - [Prerequisites](#prerequisites)
   - [Environment Configuration](#environment-configuration)
   - [Installation & Seeding](#installation--seeding)
   - [Running the Application](#running-the-application)
7. [Running the Automated Test Suite](#7-running-the-automated-test-suite)
8. [Production Deployment Guide](#8-production-deployment-guide)
   - [Frontend on Vercel](#a-frontend-deployment-on-vercel)
   - [Backend on Render / Railway](#b-backend-deployment-on-render--railway)
   - [Database on MongoDB Atlas](#c-database-on-mongodb-atlas)
9. [Security Hardening Checklist](#9-security-hardening-checklist)
10. [License](#10-license)

---

## 1. Overview & Visual Identity

This portfolio website is engineered for **Jaswanth Naidu**, presenting capabilities across **Full-Stack Engineering**, **Artificial Intelligence**, **Machine Learning**, and **Generative AI (RAG applications)**.

### Design System Principles
- **Deep Black Background**: `#0B0F10` base canvas with subtle 32px developer grid overlay.
- **Neon Green Accent**: `#39FF88` representing terminal prompt output and primary call-to-actions.
- **Neon Cyan Accent**: `#00D9FF` representing API routes, parameters, and interactive badges.
- **Typography**: 
  - **JetBrains Mono** & **Fira Code**: Code blocks, terminal prompts, commands, and badges.
  - **Inter**: High-legibility narrative typography for bio, educational context, and descriptions.
- **Window Aesthetics**: Code-editor window frames featuring macOS/Linux window dots (`#FF5C5C`, `#FFB84C`, `#39FF88`) and editor file tabs.
- **Subtle Dynamics**: HTML5 canvas node constellation connecting smoothly to mouse position without hindering legibility or performance.

---

## 2. Technology Stack

### Frontend
- **React.js 18** (Functional components, custom hooks, context providers)
- **Vite** (Next-generation lightning-fast frontend tooling)
- **Tailwind CSS 3** (Custom terminal theme extensions, utility classes)
- **Framer Motion** (Subtle viewport transitions, modals, and stagger animations)
- **Lucide React** (Clean developer and system icons)
- **Axios** (Configured client with JWT request/response interceptors)
- **React Router DOM 6** (Single Page Application routing with Protected Route guard)

### Backend
- **Node.js & Express.js** (REST API architecture following clean MVC pattern)
- **JWT (JSON Web Tokens)** (Role-based stateless administrative authorization)
- **bcryptjs** (Salted password hashing with 10 salt rounds)
- **Helmet** (HTTP security headers safeguarding against XSS and clickjacking)
- **CORS** (Origin whitelisting)
- **express-rate-limit** (Brute-force protection on `/api/auth/login` and `/api/contact`)
- **Multer** (Disk-storage engine for local and cloud project thumbnail uploads)

### Database
- **MongoDB** & **Mongoose ODM** (Strict schemas, pre-save hooks, validation)

---

## 3. Architecture & Folder Structure

```
my-portfolio/
├── .gitignore                      # Git exclusion rules (.env, node_modules, dist)
├── README.md                       # Complete documentation & API catalog
├── package.json                    # Monorepo concurrency orchestration
│
├── client/                         # React + Vite Single Page Application
│   ├── index.html                  # HTML entry point with JetBrains Mono & Inter
│   ├── vite.config.js              # Vite server & dev proxy to backend port 5000
│   ├── tailwind.config.js          # Terminal color tokens & animations
│   ├── postcss.config.js
│   ├── vercel.json                 # SPA rewrite rules for Vercel deployment
│   ├── public/
│   │   ├── favicon.svg             # Terminal prompt SVG favicon
│   │   └── resume.pdf              # Downloadable resume template
│   └── src/
│       ├── main.jsx                # Application root with BrowserRouter
│       ├── App.jsx                 # Route definitions & global providers
│       ├── index.css               # Tailwind directives & terminal scrollbars
│       ├── api/
│       │   └── axiosClient.js      # Axios instance with interceptors
│       ├── context/
│       │   ├── ThemeContext.jsx    # Dark / Light theme provider with localStorage
│       │   └── AuthContext.jsx     # Admin JWT session provider
│       ├── data/
│       │   └── portfolioData.js    # Showcase projects, skills, bio & timeline
│       ├── components/
│       │   ├── common/             # Navbar, Footer, Modal, ThemeToggle, ProtectedRoute
│       │   ├── hero/               # HeroSection, ParticleBackground
│       │   ├── about/              # AboutSection (developer_spec.ts)
│       │   ├── skills/             # SkillsSection, SkillCard
│       │   ├── projects/           # ProjectsSection, ProjectCard, ProjectModal
│       │   ├── timeline/           # TimelineSection, TimelineItem
│       │   ├── contact/            # ContactSection (POST /api/contact)
│       │   └── terminal/           # InteractiveTerminal (CLI console)
│       └── pages/
│           ├── HomePage.jsx        # Public portfolio landing page
│           ├── LoginPage.jsx       # Admin login gateway
│           ├── NotFoundPage.jsx    # 404 terminal error page
│           └── admin/
│               └── AdminDashboard.jsx # Admin CRUD project, message, and profile manager
│
└── server/                         # Express REST API (MVC Architecture)
    ├── server.js                   # Express application entry point
    ├── config/
    │   └── db.js                   # Mongoose connection manager
    ├── models/
    │   ├── Admin.js                # Admin schema with bcrypt hash & matchPassword
    │   ├── Project.js              # Project showcase schema
    │   ├── ContactMessage.js       # Contact submissions schema
    │   └── PortfolioProfile.js     # Dynamic profile metadata schema
    ├── controllers/
    │   ├── authController.js       # Login, logout, getMe
    │   ├── projectController.js    # CRUD projects & thumbnail uploads
    │   ├── contactController.js    # Submit, list, mark read, delete messages
    │   └── portfolioController.js  # Retrieve & update portfolio bio
    ├── middleware/
    │   ├── authMiddleware.js       # JWT bearer token verifier
    │   ├── errorMiddleware.js      # Centralized JSON error responder
    │   ├── rateLimiter.js          # Express rate limiters (auth & contact)
    │   └── uploadMiddleware.js     # Multer file storage engine
    ├── routes/
    │   ├── authRoutes.js           # /api/auth
    │   ├── projectRoutes.js        # /api/projects
    │   ├── contactRoutes.js        # /api/contact
    │   └── portfolioRoutes.js      # /api/portfolio
    ├── services/
    │   └── seedService.js          # Automatic database seeder for admin & projects
    ├── utils/
    │   ├── generateToken.js        # JWT token signer
    │   └── validators.js           # Email & string sanitizers
    ├── tests/
    │   └── apiTest.js              # Automated backend test suite
    └── uploads/
        └── .gitkeep                # Tracked upload directory
```

---

## 4. Key Features

### Interactive Terminal Console
Accessible directly on the Hero section via the **"Open Console"** button or navigation:
- `help` - Lists all available terminal commands.
- `whoami` - Prints developer bio and status.
- `about` - Displays software development journey & career objectives.
- `skills` - Prints categorized technical skillset.
- `projects` - Lists featured repositories with one-click scroll shortcuts.
- `contact` - Displays transmission coordinates and contact form link.
- `clear` - Clears the terminal buffer.
- `sudo` - Security restriction easter egg.
- `date` - Prints current system timestamp.
- **Mobile Touch Chips**: Mobile users can execute commands via tactile chips without needing a keyboard.

### Showcased Repositories
1. **GoTrain** (`GoTrainSystem.java`)
   - **Stack**: Java, Spring Boot, Angular, MySQL, Spring Security, JWT
   - **Focus**: High-concurrency train reservation, atomic transactions, PNR tracking, and admin dashboard.
2. **Emergency Response FAQ Chatbot** (`emergency_rag_agent.py`)
   - **Stack**: Python, Streamlit, NLP, RAG, LLM, Vector DB
   - **Focus**: Authoritative emergency document retrieval with zero hallucination and strict fallback mechanisms.
3. **Underwater Image Enhancement & Quality Assessment** (`underwater_uif_eval.py`)
   - **Stack**: Python, Computer Vision, Machine Learning, OpenCV, Scikit-Learn
   - **Focus**: UIF algorithm restoring underwater optical fidelity and computing UIQM perceptual metrics.

### Administrative Control Center (`/admin`)
- Accessible via the **Shield icon** in the navigation bar.
- Protected by JWT Bearer token authentication.
- **Project Manager**: Add new projects, edit existing records, delete obsolete entries, and upload thumbnail files.
- **Contact Transmissions**: View submitted messages, mark as read/unread, and delete messages.
- **Profile Configuration**: Live update of portfolio headline, bio, and software development journey.

---

## 5. REST API Documentation

### Authentication (`/api/auth`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Public (Rate Limited) | Authenticate admin, returns JWT token |
| `POST` | `/api/auth/logout` | Public | Terminate admin session |
| `GET` | `/api/auth/me` | Private (Bearer JWT) | Returns current authenticated admin profile |

#### Request Example: `POST /api/auth/login`
```json
{
  "email": "admin@jaswanthnaidu.dev",
  "password": "AdminSecurePassword123!"
}
```

#### Response Example:
```json
{
  "success": true,
  "message": "Admin authentication successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "admin": {
    "id": "673070445d475c401340b001",
    "name": "Jaswanth Naidu",
    "email": "admin@jaswanthnaidu.dev",
    "role": "admin"
  }
}
```

---

### Projects (`/api/projects`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/projects` | Public | Retrieve all showcased projects |
| `GET` | `/api/projects/:id` | Public | Retrieve a single project by ID |
| `POST` | `/api/projects` | Private (Admin) | Create a new project |
| `PUT` | `/api/projects/:id` | Private (Admin) | Update an existing project |
| `DELETE` | `/api/projects/:id` | Private (Admin) | Delete a project |
| `POST` | `/api/projects/upload` | Private (Admin) | Upload thumbnail image (`multipart/form-data`) |

---

### Contact (`/api/contact`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/contact` | Public (Rate Limited) | Submit a message from public contact form |
| `GET` | `/api/contact` | Private (Admin) | Retrieve all messages |
| `PATCH`| `/api/contact/:id` | Private (Admin) | Toggle message read status (`{ "read": true }`) |
| `DELETE`| `/api/contact/:id` | Private (Admin) | Delete a contact message |

---

### Portfolio Profile (`/api/portfolio`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/portfolio` | Public | Retrieve portfolio bio & education data |
| `PUT` | `/api/portfolio` | Private (Admin) | Update portfolio profile configuration |

---

## 6. Getting Started & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) v18.0.0 or higher
- [MongoDB](https://www.mongodb.com/) (Local Community Server or MongoDB Atlas cloud URI)
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/jaswanthnaidu/my-portfolio.git
cd my-portfolio
```

### 2. Environment Configuration

#### Server Environment (`server/.env`)
Copy `server/.env.example` to `server/.env`:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/portfolio_db
JWT_SECRET=super_secret_jwt_key_change_in_production_123456
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
ADMIN_NAME=Jaswanth Naidu
ADMIN_EMAIL=admin@jaswanthnaidu.dev
ADMIN_PASSWORD=AdminSecurePassword123!
```

#### Client Environment (`client/.env`)
Copy `client/.env.example` to `client/.env`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 3. Install Dependencies
Run from the root directory to install all packages for root, client, and server:
```bash
npm install
npm install --prefix client
npm install --prefix server
```

### 4. Database Seeding (Optional Manual Seed)
The server automatically seeds default admin credentials and featured projects upon first connection to MongoDB. You can also trigger it manually:
```bash
cd server
npm run seed
```

### 5. Running the Application
To run both the Vite frontend client and Express backend server concurrently from the root directory:
```bash
npm run dev
```

- **Frontend Client**: Accessible at `http://localhost:5173`
- **Backend API**: Accessible at `http://localhost:5000/api`
- **Admin Portal**: Accessible at `http://localhost:5173/login`
  - **Email**: `admin@jaswanthnaidu.dev`
  - **Password**: `AdminSecurePassword123!`

---

## 7. Running the Automated Test Suite

A dedicated integration test suite verifies HTTP status codes, security headers, validation rejections, and unauthorized route protection:

```bash
cd server
npm test
```

---

## 8. Production Deployment Guide

### A. Frontend Deployment on Vercel
1. Push your repository to GitHub.
2. In the [Vercel Dashboard](https://vercel.com/), select **Add New Project** and import the repository.
3. Configure the Project Settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Set the Environment Variable in Vercel:
   - `VITE_API_BASE_URL`: `https://your-backend-api.onrender.com/api`
5. Deploy. The included `client/vercel.json` ensures client-side routing works on full page refreshes.

### B. Backend Deployment on Render / Railway
1. In the [Render Dashboard](https://render.com/), choose **New Web Service** and connect the repository.
2. Configure Settings:
   - **Root Directory**: `server`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
3. Configure Environment Variables in Render:
   - `NODE_ENV`: `production`
   - `PORT`: `10000` (or leave default for Render)
   - `MONGO_URI`: `mongodb+srv://<user>:<password>@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority`
   - `JWT_SECRET`: `generate_a_strong_random_secret_string`
   - `CLIENT_URL`: `https://your-portfolio.vercel.app`
   - `ADMIN_EMAIL`: `your-preferred-admin-email@domain.com`
   - `ADMIN_PASSWORD`: `your-strong-production-passphrase`
4. Deploy the service.

### C. Database on MongoDB Atlas
1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Under **Network Access**, add `0.0.0.0/0` (or Render's outbound IPs).
3. Under **Database Access**, create a user with read/write privileges.
4. Copy the connection string into the `MONGO_URI` environment variable.

---

## 9. Security Hardening Checklist

- [x] **No hardcoded secrets**: All tokens, database strings, and administrative credentials are in `.env`.
- [x] **Git protection**: `.env` and `uploads/*` are excluded via `.gitignore`. `.env.example` templates provided.
- [x] **HTTP Security Headers**: Powered by `helmet()`.
- [x] **CORS Origin Whitelisting**: Restricted to approved client domain (`CLIENT_URL`).
- [x] **Rate Limiting**: Brute-force protection on `/api/auth/login` (10 per 15 min) and spam protection on `/api/contact` (6 per 15 min).
- [x] **Password Protection**: Passwords salted and hashed with `bcryptjs` (never stored or returned in plain text).
- [x] **Stateless JWT**: Admin routes protected by bearer token middleware with expiration.
- [x] **Input Validation & Sanitization**: Regex format validation on emails, length checks on messages.

---

## 10. License

This project is licensed under the [MIT License](LICENSE).  
Engineered with precision by **Jaswanth Naidu**.
