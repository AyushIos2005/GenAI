# CareerPilot AI — Frontend Documentation

## 1. Overview

The CareerPilot AI frontend is a React-based web application that provides the user interface for an AI-powered career and interview assistance platform.

The frontend is responsible for presenting authentication flows, dashboards, interview preparation workflows, AI analysis interfaces, generated reports, history, settings, and responsive application navigation.

The application is built with React and Vite and uses Tailwind CSS and SCSS for styling.

---

# 2. Purpose

The frontend provides the presentation and interaction layer of CareerPilot AI.

Its primary responsibilities are:

* User authentication interfaces
* Application navigation
* Protected application pages
* Dashboard presentation
* Career/interview workflows
* Resume analysis interface
* AI processing states
* Interview reports
* Report history
* Practice and preparation interfaces
* Responsive layouts
* API communication with the backend
* Reusable UI components

---

# 3. Frontend Architecture

The frontend follows a component-based React architecture.

```text
Application
    │
    ├── Routing
    │
    ├── Authentication
    │
    ├── Layout
    │
    ├── Pages
    │
    ├── Features
    │
    ├── Components
    │
    ├── API Layer
    │
    └── Styling
```

The application separates reusable components, pages, feature-specific functionality, authentication state, API communication, and styling.

---

# 4. Technology Stack

| Technology    | Purpose                              |
| ------------- | ------------------------------------ |
| React         | User interface                       |
| Vite          | Development server and build tooling |
| JavaScript    | Application development              |
| React Router  | Client-side routing                  |
| Axios         | HTTP/API communication               |
| Tailwind CSS  | Utility-based styling                |
| SCSS          | Component and page styling           |
| Lucide        | Interface icons                      |
| Framer Motion | UI animation                         |

---

# 5. Directory Structure

```text
frontend/
│
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   │
│   ├── assets/
│   │   ├── hero.png
│   │   └── vite.svg
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── QuestionAccordion.jsx
│   │   │   └── ScoreRing.jsx
│   │   │
│   │   ├── AccessCard.jsx
│   │   ├── AuthShell.jsx
│   │   ├── MobileNav.jsx
│   │   └── Sidebar.jsx
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── data/
│   │   └── mock.js
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── pages/
│   │   │   └── services/
│   │   │
│   │   └── interview/
│   │       ├── pages/
│   │       └── style/
│   │
│   ├── layouts/
│   │   └── AppLayout.jsx
│   │
│   ├── lib/
│   │   └── api.js
│   │
│   ├── pages/
│   │   ├── Analyze.jsx
│   │   ├── Dashboard.jsx
│   │   ├── History.jsx
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   ├── Practice.jsx
│   │   ├── Preparation.jsx
│   │   ├── Processing.jsx
│   │   ├── Register.jsx
│   │   ├── Report.jsx
│   │   └── Settings.jsx
│   │
│   ├── routes/
│   │   └── RouteGuards.jsx
│   │
│   ├── App.jsx
│   ├── app.routes.jsx
│   ├── index.css
│   ├── main.jsx
│   └── style.scss
│
├── .gitignore
├── .oxlintrc.json
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

---

# 6. Application Entry Point

The React application starts from:

```text
src/main.jsx
```

The root application component is:

```text
src/App.jsx
```

Application routing is organized through:

```text
src/app.routes.jsx
```

This structure separates application initialization from route definitions and individual page components.

---

# 7. Routing

The application uses client-side routing to provide navigation between application screens.

Route-related files are located at:

```text
src/app.routes.jsx
src/routes/RouteGuards.jsx
```

The application contains routes for areas including:

* Landing
* Login
* Registration
* Dashboard
* Analysis
* Preparation
* Practice
* Processing
* Report
* History
* Settings

---

# 8. Route Protection

Protected application routes are handled through:

```text
src/routes/RouteGuards.jsx
```

The purpose of route guards is to prevent unauthorized users from accessing authenticated application pages.

Conceptually:

```text
User
 │
 ▼
Route
 │
 ▼
Authentication Check
 │
 ├── Not Authenticated ──► Login
 │
 └── Authenticated
          │
          ▼
       Protected Page
```

---

# 9. Authentication Architecture

Authentication-related functionality is organized under:

```text
src/features/auth/
```

The authentication feature contains:

```text
components/
hooks/
pages/
services/
```

The application also maintains authentication state through:

```text
src/context/AuthContext.jsx
```

Authentication-related API functionality is maintained separately from UI components.

---

# 10. Authentication Flow

The general frontend authentication flow is:

```text
Login / Register
       │
       ▼
Authentication API
       │
       ▼
Backend
       │
       ▼
Authenticated Session
       │
       ▼
Auth Context
       │
       ▼
Protected Routes
       │
       ▼
Application
```

Authentication state can then be consumed by components and route guards.

---

# 11. API Layer

API communication is centralized through:

```text
src/lib/api.js
```

Authentication-specific API operations are organized inside:

```text
src/features/auth/services/
```

This separation provides a consistent interface between React components and the backend API.

A typical request flow is:

```text
React Component
      │
      ▼
API Service
      │
      ▼
Axios
      │
      ▼
Backend REST API
      │
      ▼
Response
      │
      ▼
React State / UI
```

---

# 12. Application Pages

## Landing

```text
src/pages/Landing.jsx
```

Provides the public entry point for the application.

---

## Authentication

```text
src/pages/Login.jsx
src/pages/Register.jsx
```

Provides user authentication interfaces.

Feature-specific authentication pages are also organized under:

```text
src/features/auth/pages/
```

---

## Dashboard

```text
src/pages/Dashboard.jsx
```

Provides the authenticated application's primary dashboard interface.

---

## Analysis

```text
src/pages/Analyze.jsx
```

Provides the interface for initiating and displaying career/interview analysis workflows.

---

## Processing

```text
src/pages/Processing.jsx
```

Represents the processing state while an analysis workflow is being handled.

---

## Report

```text
src/pages/Report.jsx
```

Displays generated analysis/report information.

---

## History

```text
src/pages/History.jsx
```

Provides access to previous analysis/report information available to the application.

---

## Preparation

```text
src/pages/Preparation.jsx
```

Provides interview/career preparation functionality.

---

## Practice

```text
src/pages/Practice.jsx
```

Provides the practice interface for interview preparation.

---

## Settings

```text
src/pages/Settings.jsx
```

Provides application/user settings functionality.

---

# 13. Reusable Components

Reusable interface components are located under:

```text
src/components/
```

Examples include:

### Sidebar

```text
Sidebar.jsx
```

Provides application navigation for desktop layouts.

### Mobile Navigation

```text
MobileNav.jsx
```

Provides navigation optimized for smaller screens.

### Authentication Shell

```text
AuthShell.jsx
```

Provides a reusable layout for authentication-related screens.

### Access Card

```text
AccessCard.jsx
```

Provides reusable access/action UI.

### Question Accordion

```text
QuestionAccordion.jsx
```

Provides expandable question/answer presentation.

### Score Ring

```text
ScoreRing.jsx
```

Provides visual score presentation for report-related interfaces.

---

# 14. Layout Architecture

The primary authenticated application layout is:

```text
src/layouts/AppLayout.jsx
```

The layout provides shared application structure around protected pages.

Conceptually:

```text
App Layout
│
├── Sidebar
│
├── Mobile Navigation
│
└── Page Content
```

This prevents individual pages from duplicating common navigation and layout code.

---

# 15. State Management

Authentication state is maintained through:

```text
src/context/AuthContext.jsx
```

Authentication-specific hooks and services are organized under:

```text
src/features/auth/
```

This keeps authentication state and operations separate from presentation components.

---

# 16. Styling Architecture

The frontend uses multiple styling mechanisms.

### Tailwind CSS

Tailwind configuration:

```text
tailwind.config.js
```

### SCSS

Page and feature-specific SCSS files are located throughout:

```text
src/
```

Examples include:

```text
src/style.scss
src/index.css
src/features/auth/services/auth.form.scss
src/features/interview/style/home.scss
```

The project can therefore combine utility classes with dedicated stylesheet files where required.

---

# 17. Responsive Design

The application is designed to support different screen sizes.

The frontend includes dedicated responsive navigation components such as:

```text
MobileNav.jsx
Sidebar.jsx
```

The interface is structured to support:

* Desktop layouts
* Laptop layouts
* Tablet layouts
* Mobile layouts

---

# 18. Animation and Interaction

The project includes animation-oriented frontend dependencies and UI components designed for interactive application experiences.

Animations should be used to communicate:

* Navigation transitions
* Processing states
* Component visibility
* User interaction feedback
* Page transitions

Animations should not interfere with core navigation or accessibility.

---

# 19. Environment Configuration

Frontend environment variables can be configured using a `.env` file.

Example:

```env
VITE_API_URL=http://localhost:3000
```

For production:

```env
VITE_API_URL=https://your-backend-domain.com
```

Only variables intended to be exposed to the browser should use the `VITE_` prefix.

### Security Consideration

Frontend environment variables are bundled into client-side code.

Therefore, never place private credentials such as:

* Database passwords
* JWT signing secrets
* Private API keys
* OAuth client secrets

inside frontend environment variables.

---

# 20. Installation

Clone the repository:

```bash
git clone https://github.com/AyushIos2005/GenAI.git
```

Navigate to the frontend:

```bash
cd GenAI/frontend
```

Install dependencies:

```bash
npm install
```

Create the required environment configuration:

```text
frontend/.env
```

Start the development server:

```bash
npm run dev
```

---

# 21. Development Workflow

A typical development workflow is:

```text
Start Backend
     │
     ▼
Start Frontend
     │
     ▼
Open Application
     │
     ▼
Authenticate
     │
     ▼
Access Dashboard
     │
     ▼
Start Career/Interview Workflow
     │
     ▼
Send API Request
     │
     ▼
Backend / AI Processing
     │
     ▼
Display Result
```

---

# 22. Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

The generated production files can then be deployed to a static hosting platform.

---

# 23. Deployment

The frontend can be deployed on a platform that supports Vite/React applications.

Typical deployment configuration requires:

```text
Build Command:
npm run build

Output Directory:
dist
```

The exact configuration depends on the hosting provider.

The production frontend must be configured to communicate with the deployed backend API.

---

# 24. Backend Integration

The frontend communicates with the backend through HTTP APIs.

The complete application architecture is:

```text
┌──────────────────────┐
│   CareerPilot AI     │
│      Frontend        │
│      React/Vite      │
└──────────┬───────────┘
           │
           │ HTTP / REST
           ▼
┌──────────────────────┐
│      Backend API     │
│   Node.js/Express    │
└──────────┬───────────┘
           │
      ┌────┴─────┐
      ▼          ▼
┌──────────┐ ┌──────────┐
│ MongoDB  │ │ Gemini AI│
└──────────┘ └──────────┘
```

---

# 25. Error and Loading States

AI-powered operations may require additional processing time.

The frontend contains a dedicated processing page:

```text
src/pages/Processing.jsx
```

The UI should provide appropriate feedback during:

* API requests
* File uploads
* AI processing
* Report generation
* Authentication operations

Errors returned from the backend should be presented in a user-readable format rather than exposing internal server details.

---

# 26. Development Guidelines

When extending the frontend:

1. Keep reusable UI components inside `components/`.
2. Keep page-level functionality inside `pages/`.
3. Keep authentication functionality inside `features/auth/`.
4. Keep API communication inside the API/service layer.
5. Avoid duplicating API configuration across components.
6. Use route guards for protected application areas.
7. Keep environment-specific URLs outside source code.
8. Keep reusable layouts separate from individual pages.
9. Maintain responsive behavior when adding new UI.
10. Keep business logic separate from presentation whenever practical.

---

# 27. Troubleshooting

## Backend API is not responding

Verify that the backend server is running and that:

```text
VITE_API_URL
```

points to the correct backend address.

---

## Authentication is not working

Check:

* Backend authentication endpoint
* Frontend API configuration
* Authentication session/cookie configuration
* Browser network requests
* Backend CORS configuration

---

## CORS errors

Verify that the backend allows the exact frontend origin.

For example:

```text
Frontend:
https://your-frontend-domain.com

Backend:
https://your-backend-domain.com
```

Avoid adding unnecessary trailing slashes when configuring origins.

---

## Production API requests fail

Verify:

1. Production frontend environment variables.
2. Backend deployment URL.
3. Backend CORS configuration.
4. HTTPS configuration.
5. Browser network requests.
6. Backend logs.

---

# 28. Future Development

Possible frontend improvements include:

* Comprehensive automated testing
* Component testing
* Accessibility improvements
* Advanced error boundaries
* Improved offline handling
* More detailed dashboard analytics
* Enhanced interview interaction
* Real-time interview capabilities
* Progressive Web App support
* Performance optimization
* Improved loading and skeleton states

---

# 29. Project Information

**Project:** CareerPilot AI
**Component:** Frontend Application
**Framework:** React
**Build Tool:** Vite
**Developer:** Ayush Verma
**Repository:** `AyushIos2005/GenAI`

---

## License

Refer to the repository-level `LICENSE` file for licensing information.
