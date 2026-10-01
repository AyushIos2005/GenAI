# CareerPilot AI — Backend Documentation

## 1. Overview

The CareerPilot AI backend is a RESTful API service responsible for authentication, user management, resume/file processing, AI-powered career and interview analysis, and persistence of generated interview reports.

The backend is implemented using Node.js and Express.js and follows a modular architecture separating routes, controllers, services, middleware, database configuration, and data models.

The application uses MongoDB for persistent data storage and integrates Google Gemini for AI-powered analysis.

---

## 2. Purpose

The backend provides the application layer between the CareerPilot AI frontend and its external services.

Its primary responsibilities are:

* User registration and authentication
* Secure password storage
* Authentication and protected API access
* Session/token invalidation
* File upload processing
* AI-powered interview and career analysis
* Interview report persistence
* MongoDB database communication
* Request processing and validation
* Centralized application configuration

---

## 3. Backend Architecture

The backend follows a modular layered architecture.

```text
Client
  │
  ▼
Express Application
  │
  ├── Routes
  │
  ▼
Controllers
  │
  ├── Authentication
  ├── Interview Processing
  │
  ▼
Services
  │
  ├── AI Service
  │
  ▼
External Services
  │
  ├── Google Gemini
  │
  ▼
Database Layer
  │
  └── MongoDB / Mongoose
```

Authentication requests additionally pass through authentication middleware before protected controller operations are executed.

---

## 4. Technology Stack

| Technology     | Role                               |
| -------------- | ---------------------------------- |
| Node.js        | JavaScript runtime                 |
| Express.js     | HTTP server and REST API framework |
| MongoDB        | Persistent database                |
| Mongoose       | MongoDB object modeling            |
| JSON Web Token | Authentication                     |
| bcrypt         | Password hashing                   |
| Google Gemini  | Generative AI processing           |
| Zod            | Schema/data validation             |
| Multer         | File upload handling               |
| dotenv         | Environment configuration          |

---

## 5. Directory Structure

```text
backend/
│
├── .agents/
│   └── skills/
│       └── gemini-interactions-api/
│           ├── SKILL.md
│           └── references/
│               └── migration.md
│
├── src/
│   │
│   ├── Routes/
│   │   ├── auth.route.js
│   │   └── interview.route.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── interview.controller.js
│   │
│   ├── db/
│   │   └── db.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── file.middleware.js
│   │
│   ├── models/
│   │   ├── blacklist.model.js
│   │   ├── interviewReport.model.js
│   │   └── user.model.js
│   │
│   └── services/
│       ├── ai.service.js
│       └── temp.js
│
├── package.json
├── package-lock.json
├── server.js
├── skills-lock.json
└── readme.md
```

---

# 6. Application Entry Point

The backend application is started through:

```text
server.js
```

The server initializes the Express application and starts listening on the configured port.

The main Express application is organized in:

```text
src/app.js
```

This separation keeps server startup concerns separate from application configuration and routing.

---

# 7. Routing Layer

Routes define the HTTP endpoints exposed by the backend.

## Authentication Routes

```text
src/Routes/auth.route.js
```

This module contains authentication-related endpoints such as registration, login, and logout operations.

## Interview Routes

```text
src/Routes/interview.route.js
```

This module contains endpoints related to interview processing and AI-powered analysis.

Protected operations use the authentication middleware before reaching their respective controllers.

---

# 8. Controller Layer

Controllers contain request-handling logic and coordinate application operations.

## Authentication Controller

```text
src/controllers/auth.controller.js
```

Responsible for authentication-related operations including:

* User registration
* User login
* Authentication session handling
* Logout/session invalidation

## Interview Controller

```text
src/controllers/interview.controller.js
```

Responsible for interview-related processing and coordinating AI analysis and report generation.

---

# 9. Service Layer

Business logic that interacts with external AI functionality is separated into services.

## AI Service

```text
src/services/ai.service.js
```

The AI service is responsible for communicating with Google Gemini and processing AI-generated results used by the application.

The general processing pipeline is:

```text
Request
   │
   ▼
Interview Controller
   │
   ▼
AI Service
   │
   ▼
Google Gemini
   │
   ▼
Structured AI Response
   │
   ▼
Controller
   │
   ▼
Database / Client
```

Separating AI communication from controllers makes the integration easier to maintain and replace independently.

---

# 10. Database Layer

Database configuration is located at:

```text
src/db/db.js
```

The backend uses MongoDB with Mongoose for persistence.

Mongoose models define the structure of application data and provide the interface used by controllers and services to interact with MongoDB.

---

# 11. Data Models

## User Model

```text
src/models/user.model.js
```

The user model represents application users and authentication-related information.

It is used during:

* Registration
* Login
* Authentication
* Protected request processing

Passwords are handled using hashing rather than storing plaintext credentials.

---

## Interview Report Model

```text
src/models/interviewReport.model.js
```

The interview report model stores generated interview/career analysis results.

Reports allow generated analysis to be persisted and accessed as part of the application's interview/report workflow.

---

## Blacklist Model

```text
src/models/blacklist.model.js
```

The blacklist model is used for invalidated authentication tokens.

It supports logout/session invalidation by allowing previously issued tokens to be treated as invalid.

---

# 12. Authentication

The application uses JSON Web Tokens for authentication.

The authentication flow is:

```text
User
 │
 ├── Register
 │      │
 │      ▼
 │   Password Hashing
 │      │
 │      ▼
 │   User Stored in MongoDB
 │
 └── Login
        │
        ▼
     Credentials Verified
        │
        ▼
     JWT Generated
        │
        ▼
     Authenticated Session
```

Protected requests are processed through:

```text
src/middlewares/auth.middleware.js
```

The middleware verifies the authentication token before allowing access to protected resources.

---

# 13. Authentication Middleware

The authentication middleware is responsible for:

1. Reading the authentication token.
2. Verifying the token.
3. Identifying the authenticated user.
4. Loading the corresponding user information.
5. Attaching authentication information to the request.
6. Rejecting unauthorized requests.

Conceptually:

```text
Incoming Request
       │
       ▼
Authentication Middleware
       │
       ├── No Token ───────► Unauthorized
       │
       ├── Invalid Token ─► Unauthorized
       │
       └── Valid Token
              │
              ▼
        Controller
```

---

# 14. File Processing

File upload handling is separated into:

```text
src/middlewares/file.middleware.js
```

The middleware is responsible for handling uploaded files before they are processed by the relevant controller.

This keeps file-processing concerns separate from authentication and business logic.

---

# 15. AI Processing

CareerPilot AI uses Google Gemini as the generative AI layer.

The backend sends relevant career/interview information to the AI service and processes the generated response.

A simplified flow is:

```text
Resume / Interview Input
          │
          ▼
      API Request
          │
          ▼
Interview Controller
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
 Interview Report
          │
          ▼
       MongoDB
```

The project also contains Gemini-related interaction documentation under:

```text
backend/.agents/skills/gemini-interactions-api/
```

---

# 16. Validation

The project includes Zod as a validation dependency.

Validation can be used to ensure that incoming data follows the expected structure before application logic processes it.

The intended flow is:

```text
Client Request
      │
      ▼
Validation
      │
      ├── Invalid ──► Error Response
      │
      ▼
Controller
```

---

# 17. Environment Configuration

Sensitive and environment-specific configuration should be provided through environment variables.

Create:

```text
backend/.env
```

Example configuration:

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key

CLIENT_URL=http://localhost:5173
```

The exact variable names should match those referenced by the backend configuration.

### Security Requirement

Environment files must not be committed to the repository.

Never expose:

* MongoDB credentials
* JWT secrets
* Gemini API keys
* OAuth credentials
* Other private application secrets

---

# 18. Installation

Clone the repository:

```bash
git clone https://github.com/AyushIos2005/GenAI.git
```

Navigate to the backend:

```bash
cd GenAI/backend
```

Install dependencies:

```bash
npm install
```

Configure environment variables:

```text
backend/.env
```

Start the backend using the configured npm scripts.

For development, if a development script is configured:

```bash
npm run dev
```

Otherwise:

```bash
npm start
```

---

# 19. API Development

API testing can be performed using tools such as:

* Postman
* Thunder Client
* Insomnia

A typical API request flow is:

```text
Frontend
   │
   ▼
HTTP Request
   │
   ▼
Express Route
   │
   ▼
Middleware
   │
   ▼
Controller
   │
   ▼
Service / Model
   │
   ▼
HTTP Response
```

---

# 20. Error Handling

The backend should return appropriate HTTP status codes for different request outcomes.

Common categories include:

| Status | Meaning                         |
| ------ | ------------------------------- |
| 200    | Request processed successfully  |
| 201    | Resource created                |
| 400    | Invalid request/data            |
| 401    | Authentication required/invalid |
| 403    | Access denied                   |
| 404    | Resource not found              |
| 500    | Internal server error           |

Client applications should handle these responses appropriately.

---

# 21. Security Considerations

The backend includes security-related mechanisms such as:

* Password hashing
* JWT authentication
* Protected routes
* Token invalidation
* Environment-based secrets
* File upload middleware
* Input validation

Production deployments should additionally use:

* HTTPS
* Secure cookie configuration
* Appropriate CORS configuration
* API rate limiting
* Request size limits
* Strong production secrets
* Logging and monitoring

---

# 22. Development Guidelines

When extending the backend:

1. Keep routes focused on endpoint definitions.
2. Keep controllers focused on request/response handling.
3. Keep reusable business logic in services.
4. Keep database operations within model/data-access logic.
5. Protect authenticated resources with middleware.
6. Keep secrets outside source control.
7. Validate external input before processing.
8. Avoid placing large business logic directly inside route files.

---

# 23. Production Deployment

The backend can be deployed to a Node.js-compatible hosting platform.

A production deployment requires:

1. Installing dependencies.
2. Configuring environment variables.
3. Configuring MongoDB connectivity.
4. Configuring Gemini API credentials.
5. Configuring frontend origin/CORS.
6. Starting the Node.js server.
7. Verifying API health and protected endpoints.

The frontend must use the deployed backend URL when running in production.

---

# 24. Troubleshooting

### MongoDB connection failure

Verify:

* MongoDB connection string
* Database availability
* Network access
* Environment variable configuration

### Authentication failure

Verify:

* JWT secret
* Authentication token
* Cookie configuration
* Frontend/backend origin configuration

### Gemini API failure

Verify:

* Gemini API key
* API availability
* Request payload
* AI service configuration

### File upload failure

Verify:

* Multipart request configuration
* Uploaded file type
* File middleware configuration
* Request size limits

---

# 25. Future Development

Possible future backend improvements include:

* API rate limiting
* Centralized error middleware
* OpenAPI/Swagger documentation
* Automated unit and integration tests
* Structured logging
* Request tracing
* Background AI processing
* Improved AI retry handling
* API versioning
* Production monitoring

---

# 26. Project Information

**Project:** CareerPilot AI
**Component:** Backend API
**Developer:** Ayush Verma
**Repository:** `AyushIos2005/GenAI`

---

## License

Refer to the repository-level `LICENSE` file for licensing information.
