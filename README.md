# CareerPilot AI

**AI-powered career and interview preparation platform**

CareerPilot AI is a full-stack web application designed to help users prepare for interviews and analyze career-related information using AI.

The platform combines a React-based frontend with a Node.js/Express backend, MongoDB for persistent storage, and Google Gemini for AI-powered analysis.

---

## Overview

CareerPilot AI provides an interactive workflow for users to:

* Create an account
* Sign in securely
* Access a personalized dashboard
* Start career/interview analysis
* Provide relevant career or interview information
* Process information through the AI system
* View generated analysis and reports
* Access previous reports through history
* Practice interview-related preparation
* Manage application settings

---

## Application Architecture

```text
                    CareerPilot AI
                         │
             ┌───────────┴───────────┐
             │                       │
        React Frontend          Express Backend
             │                       │
             │                 ┌─────┴─────┐
             │                 │           │
             │              MongoDB    Gemini AI
             │
             └──────── REST API ────────┘
```

### Main Technologies

**Frontend**

* React
* Vite
* JavaScript
* React Router
* Axios
* Tailwind CSS
* SCSS
* Framer Motion
* Lucide

**Backend**

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Zod
* Multer
* Google Gemini

---

# User Manual

## 1. Getting Started

Before using CareerPilot AI, make sure the frontend and backend environments are configured correctly.

### Requirements

* Node.js
* npm
* MongoDB
* Google Gemini API credentials
* Modern web browser

---

## 2. Installation

Clone the repository:

```bash
git clone https://github.com/AyushIos2005/GenAI.git
```

Move into the project:

```bash
cd GenAI
```

---

## 3. Backend Setup

Open a terminal and navigate to:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `backend` directory.

Example:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

If a development script is not configured:

```bash
npm start
```

The backend should now be available on the configured port.

---

# 4. Frontend Setup

Open another terminal.

Navigate to:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file if required:

```env
VITE_API_URL=http://localhost:3000
```

Start the frontend:

```bash
npm run dev
```

Open the local URL provided by Vite in your browser.

---

# 5. Creating an Account

When you open CareerPilot AI for the first time:

1. Navigate to the registration page.
2. Enter the required account information.
3. Submit the registration form.
4. After successful registration, sign in using your credentials.
5. The authenticated application becomes available.

---

# 6. Login

To access the application:

1. Open the Login page.
2. Enter your registered credentials.
3. Submit the form.
4. The backend verifies the credentials.
5. An authenticated session is established.
6. You are redirected to the protected application area.

Protected pages are not intended to be accessible without authentication.

---

# 7. Dashboard

After authentication, the Dashboard acts as the main application area.

Depending on the available workflow, users can navigate to:

* Analysis
* Interview Preparation
* Practice
* Reports
* History
* Settings

The application uses a shared layout and navigation system to provide consistent access to these areas.

---

# 8. Career / Interview Analysis

The analysis workflow is designed to process career and interview-related information using the AI backend.

General workflow:

```text
Start Analysis
      │
      ▼
Provide Required Information
      │
      ▼
Submit Request
      │
      ▼
Backend Processing
      │
      ▼
Gemini AI Analysis
      │
      ▼
Generate Report
      │
      ▼
View Results
```

The processing page provides feedback while the request is being handled.

---

# 9. AI-Powered Analysis

CareerPilot AI uses Google Gemini to generate analysis based on the information submitted through the application.

The frontend communicates with the backend rather than directly exposing the Gemini API credentials.

```text
User
 │
 ▼
React Frontend
 │
 ▼
Backend API
 │
 ▼
AI Service
 │
 ▼
Google Gemini
 │
 ▼
Generated Analysis
 │
 ▼
Backend
 │
 ▼
Frontend Report
```

This architecture keeps AI credentials on the server side.

---

# 10. Processing

AI operations may require additional processing time.

During an analysis request, the application displays a processing state rather than leaving the user without feedback.

The general state flow is:

```text
Input
  ↓
Submitting
  ↓
Processing
  ↓
Analysis Complete
  ↓
Report
```

If an error occurs, the user should retry the operation after checking the displayed error information.

---

# 11. Reports

After successful AI processing, the generated analysis is displayed through the Report section.

A report can contain the information generated by the backend AI workflow.

The report interface is designed to present analysis in a structured and readable format.

---

# 12. History

The History section provides access to previously generated analysis/report information available to the authenticated user.

This allows users to return to earlier results without restarting the entire analysis workflow.

General flow:

```text
Dashboard
   ↓
History
   ↓
Previous Reports
   ↓
Select Report
   ↓
View Analysis
```

---

# 13. Interview Preparation

The Preparation section provides an interface dedicated to interview preparation.

Users can use the available preparation workflow to review and work with interview-related material.

---

# 14. Practice

The Practice section provides an additional area for interview preparation and practice-oriented interaction.

The exact available functionality depends on the current application implementation.

---

# 15. Settings

The Settings section provides access to available application/user configuration options.

Users can navigate to Settings from the authenticated application layout.

---

# 16. Authentication & Security

CareerPilot AI uses backend-managed authentication.

The backend uses:

* JWT-based authentication
* Password hashing
* Protected routes
* Authentication middleware
* Token invalidation support
* Environment variables for sensitive configuration

Users should never share their login credentials or application secrets.

---

# 17. API Communication

The frontend communicates with the backend through REST APIs.

```text
React Component
      │
      ▼
API Layer
      │
      ▼
Axios
      │
      ▼
Express Route
      │
      ▼
Controller
      │
      ├── Database
      │
      └── AI Service
```

The frontend API configuration is maintained separately so that development and production backend URLs can be configured without modifying individual components.

---

# 18. Project Structure

The repository contains two primary application layers:

```text
GenAI/
│
├── backend/
│   ├── src/
│   ├── server.js
│   ├── package.json
│   └── readme.md
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README.md
│
├── LICENSE
├── README.md
└── .gitignore
```

Detailed technical documentation is available inside the respective frontend and backend directories.

---

# 19. Development

### Start Backend

```bash
cd backend
npm install
npm run dev
```

### Start Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Both services should be running before testing the complete application workflow.

---

# 20. Production Build

### Frontend

Create a production build:

```bash
cd frontend
npm run build
```

Preview the production build:

```bash
npm run preview
```

### Backend

Configure production environment variables and start the Node.js server using the appropriate production command.

---

# 21. Environment Variables

### Backend

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
CLIENT_URL=http://localhost:5173
```

### Frontend

```env
VITE_API_URL=http://localhost:3000
```

Environment variable names should match the configuration used by the application.

> **Important:** Never commit `.env` files, database credentials, JWT secrets, or private API credentials to GitHub.

---

# 22. Troubleshooting

### Frontend cannot connect to backend

Check:

* Backend server is running.
* `VITE_API_URL` points to the correct backend.
* Backend CORS configuration allows the frontend origin.
* Browser Network tab for failed requests.

---

### Authentication does not work

Check:

* Login request in the browser Network tab.
* Backend authentication logs.
* JWT configuration.
* Cookie/session configuration.
* Frontend/backend origin configuration.

---

### AI analysis fails

Check:

* Gemini API configuration.
* Gemini API availability.
* Backend environment variables.
* Request payload.
* Backend logs.

---

### MongoDB connection fails

Check:

* MongoDB connection string.
* Database availability.
* Network access.
* Backend environment configuration.

---

# 23. Security Recommendations

For production usage:

* Use HTTPS.
* Use strong JWT secrets.
* Keep API credentials on the backend.
* Never commit `.env` files.
* Configure CORS with the exact frontend origin.
* Use secure cookie settings.
* Add API rate limiting.
* Validate incoming data.
* Monitor production errors and logs.

---

# 24. Future Development

Potential improvements for the platform include:

* More advanced AI interview interaction
* Real-time interview sessions
* Expanded career analytics
* Improved report visualization
* Automated testing
* API documentation
* Advanced error handling
* Rate limiting
* Structured application logging
* Performance optimization
* Accessibility improvements
* Enhanced mobile experience

---

# 25. Project Information

**Project Name:** CareerPilot AI
**Type:** Full-Stack AI Web Application
**Frontend:** React + Vite
**Backend:** Node.js + Express.js
**Database:** MongoDB
**AI:** Google Gemini

**Developer:** Ayush Verma

---

## License

This project includes a repository-level `LICENSE` file. Refer to the license file for the applicable licensing terms.
