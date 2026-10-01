# Frontend API Documentation

## 1. API Overview

**Base URL**

```text
http://localhost:3000/api
```

### Authentication

Authentication uses a **JWT stored in an HTTP cookie** named:

```text
token
```

The frontend must send cookies with every authenticated request.

### Axios Configuration

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export default api;
```

For `fetch`:

```javascript
fetch("http://localhost:3000/api/auth/get-me", {
  credentials: "include",
});
```

---

# 2. Authentication APIs

## 2.1 Register User

### Endpoint

```http
POST /auth/register
```

### Access

Public

### Request Body

```json
{
  "username": "Ayush",
  "email": "ayush@example.com",
  "password": "12345678"
}
```

### Required Fields

| Field    | Type   | Required |
| -------- | ------ | -------- |
| username | string | Yes      |
| email    | string | Yes      |
| password | string | Yes      |

### Success Response

**Status:** `201 Created`

```json
{
  "message": "User registered successfully",
  "user": {
    "id": "USER_ID",
    "username": "Ayush",
    "email": "ayush@example.com"
  }
}
```

A JWT cookie named `token` is also created.

### Error Response

**Status:** `400 Bad Request`

```json
{
  "message": "Please Provide username,email and password"
}
```

or:

```json
{
  "message": "Account Already exist with this email address or username"
}
```

---

# 3. Login User

## Endpoint

```http
POST /auth/login
```

### Access

Public

### Request Body

```json
{
  "email": "ayush@example.com",
  "password": "12345678"
}
```

### Success Response

**Status:** `200 OK`

```json
{
  "message": "User LoggedIn Succefully",
  "user": {
    "id": "USER_ID",
    "username": "Ayush",
    "email": "ayush@example.com"
  }
}
```

The server creates the following cookie:

```text
token
```

### Invalid Credentials

**Status:** `400 Bad Request`

```json
{
  "message": "Invalid email or password"
}
```

### Frontend Example

```javascript
const response = await api.post("/auth/login", {
  email,
  password,
});

console.log(response.data.user);
```

After successful login, the browser automatically stores the authentication cookie.

---

# 4. Logout User

## Endpoint

```http
GET /auth/logout
```

### Access

Public

### Request

No body required.

### Success Response

**Status:** `200 OK`

```json
{
  "message": "User logged Out successfully"
}
```

The backend:

1. Adds the current token to the blacklist.
2. Clears the `token` cookie.

### Frontend Example

```javascript
await api.get("/auth/logout");
```

---

# 5. Get Current User

## Endpoint

```http
GET /auth/get-me
```

### Access

Private

### Authentication

Requires the `token` cookie.

### Request Body

None.

### Success Response

**Status:** `200 OK`

```json
{
  "message": "user detail fetched succesfully",
  "user": {
    "id": "USER_ID",
    "username": "Ayush",
    "email": "ayush@example.com"
  }
}
```

### Authentication Error

**Status:** `401 Unauthorized`

```json
{
  "message": "Token not provided"
}
```

Other possible response:

```json
{
  "message": "token is invalid"
}
```

or:

```json
{
  "message": "Invalid token."
}
```

### Frontend Example

```javascript
const response = await api.get("/auth/get-me");

const user = response.data.user;
```

---

# 6. Interview APIs

All interview APIs require authentication.

The frontend must send:

```text
Cookie: token=<JWT>
```

With Axios:

```javascript
withCredentials: true
```

---

# 7. Generate Interview Report

## Endpoint

```http
POST /interview
```

### Access

Private

### Content-Type

```text
multipart/form-data
```

### Form Fields

| Field           | Type   | Required | Description                  |
| --------------- | ------ | -------- | ---------------------------- |
| resume          | File   | Yes      | Candidate resume PDF         |
| selfDescription | string | Yes      | Candidate's self-description |
| jobDescription  | string | Yes      | Target job description       |

### Resume Restrictions

Maximum file size:

```text
3 MB
```

The backend extracts text from the uploaded PDF and sends it to Gemini AI.

### Frontend Example

```javascript
const formData = new FormData();

formData.append("resume", resumeFile);
formData.append("selfDescription", selfDescription);
formData.append("jobDescription", jobDescription);

const response = await api.post("/interview", formData);
```

**Do not manually set `Content-Type`** when using `FormData` with Axios. Axios/browser will set the correct multipart boundary.

### Success Response

**Status:** `201 Created`

```json
{
  "message": "Interview Report Genearate Succfesscully",
  "interviewReport": {
    "_id": "REPORT_ID",
    "user": "USER_ID",
    "resume": "Extracted resume text...",
    "selfDescription": "I am a full stack developer...",
    "jobDescription": "We are looking for...",
    "matchScore": 82,
    "technicalQuestions": [
      {
        "question": "Explain the difference between SQL and NoSQL databases.",
        "intention": "Tests database fundamentals.",
        "answer": "SQL databases are relational..."
      }
    ],
    "behavioralQuestions": [
      {
        "question": "Tell me about a difficult project you worked on.",
        "intention": "Evaluates problem-solving and communication.",
        "answer": "Use the STAR method..."
      }
    ],
    "skillGaps": [
      {
        "skill": "Docker",
        "severity": "medium"
      }
    ],
    "preparationPlan": [
      {
        "day": 1,
        "focus": "JavaScript Fundamentals",
        "tasks": [
          "Revise closures",
          "Revise promises",
          "Practice async/await"
        ]
      }
    ],
    "createdAt": "2026-08-15T00:00:00.000Z",
    "updatedAt": "2026-08-15T00:00:00.000Z"
  }
}
```

### Generated Report Structure

The AI generates:

* Match score
* 10 technical questions
* 5 behavioral questions
* Skill gaps
* 7-day preparation plan

---

# 8. Get Interview Report by ID

## Endpoint

```http
GET /interview/report/:interviewId
```

### Access

Private

### URL Example

```text
GET /interview/report/66c123456789abcdef123456
```

### Parameters

| Parameter   | Type   | Required |
| ----------- | ------ | -------- |
| interviewId | string | Yes      |

### Success Response

**Status:** `200 OK`

```json
{
  "message": "Interview report fetched successfully.",
  "interviewReport": {
    "_id": "REPORT_ID",
    "user": "USER_ID",
    "resume": "Resume text...",
    "selfDescription": "Candidate description...",
    "jobDescription": "Job description...",
    "matchScore": 82,
    "technicalQuestions": [],
    "behavioralQuestions": [],
    "skillGaps": [],
    "preparationPlan": [],
    "createdAt": "2026-08-15T00:00:00.000Z",
    "updatedAt": "2026-08-15T00:00:00.000Z"
  }
}
```

### Report Not Found

**Status:** `404 Not Found`

```json
{
  "message": "Interview report not found"
}
```

### Frontend Example

```javascript
const response = await api.get(`/interview/report/${reportId}`);

const report = response.data.interviewReport;
```

---

# 9. Get All Interview Reports

## Endpoint

```http
GET /interview/reports/interview
```

### Access

Private

### Request Body

None.

### Success Response

**Status:** `200 OK`

```json
{
  "message": "Interview reports fetched successfully.",
  "interviewReports": [
    {
      "_id": "REPORT_ID_1",
      "user": "USER_ID",
      "resume": "Resume text...",
      "selfDescription": "Candidate description...",
      "jobDescription": "Job description...",
      "matchScore": 82,
      "technicalQuestions": [],
      "behavioralQuestions": [],
      "skillGaps": [],
      "preparationPlan": [],
      "createdAt": "2026-08-15T00:00:00.000Z",
      "updatedAt": "2026-08-15T00:00:00.000Z"
    }
  ]
}
```

### Frontend Example

```javascript
const response = await api.get("/interview/reports/interview");

const reports = response.data.interviewReports;
```

This endpoint is useful for the frontend dashboard/history page.

---

# 10. Generate Resume PDF

## Endpoint

```http
POST /interview/resume/pdf/:interviewReportId
```

### Access

Private

### URL Example

```text
POST /interview/resume/pdf/REPORT_ID
```

### Parameters

| Parameter         | Type   | Required |
| ----------------- | ------ | -------- |
| interviewReportId | string | Yes      |

### Expected Response

The endpoint is intended to return a PDF.

### Response Headers

```http
Content-Type: application/pdf
Content-Disposition: attachment; filename=resume_REPORT_ID.pdf
```

### Frontend Axios Example

```javascript
const response = await api.post(
  `/interview/resume/pdf/${reportId}`,
  {},
  {
    responseType: "blob",
  }
);

const blob = new Blob([response.data], {
  type: "application/pdf",
});

const url = window.URL.createObjectURL(blob);

const link = document.createElement("a");
link.href = url;
link.download = `resume_${reportId}.pdf`;

document.body.appendChild(link);
link.click();

link.remove();
window.URL.revokeObjectURL(url);
```

### ⚠️ Current Backend Issue

The current controller contains a bug in `generateResumePdfController`.

It uses:

```javascript
const { resume, jobDescription, selfDescription } = interviewReport;
```

but `interviewReport` is not fetched/defined inside the controller.

Therefore, this endpoint will currently fail before generating the PDF.

The controller should first retrieve the report using `interviewReportId`, for example:

```javascript
const interviewReport =
  await interviewReportModel.findOne({
    _id: interviewReportId,
    user: req.user.id,
  });

if (!interviewReport) {
  return res.status(404).json({
    message: "Interview report not found",
  });
}
```

Then:

```javascript
const {
  resume,
  jobDescription,
  selfDescription,
} = interviewReport;
```

---

# 11. Complete API Table

| Method | Endpoint                                   | Auth    | Purpose                   |
| ------ | ------------------------------------------ | ------- | ------------------------- |
| POST   | `/auth/register`                           | Public  | Register user             |
| POST   | `/auth/login`                              | Public  | Login user                |
| GET    | `/auth/logout`                             | Public  | Logout user               |
| GET    | `/auth/get-me`                             | Private | Get logged-in user        |
| POST   | `/interview`                               | Private | Generate interview report |
| GET    | `/interview/report/:interviewId`           | Private | Get one report            |
| GET    | `/interview/reports/interview`             | Private | Get all reports           |
| POST   | `/interview/resume/pdf/:interviewReportId` | Private | Generate resume PDF       |

---

# 12. Recommended Frontend API Structure

A clean React frontend can organize the APIs like this:

```text
src/
├── api/
│   ├── axios.js
│   ├── auth.api.js
│   └── interview.api.js
│
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Dashboard.jsx
│   ├── GenerateInterview.jsx
│   └── InterviewReport.jsx
│
└── components/
    ├── MatchScore.jsx
    ├── TechnicalQuestions.jsx
    ├── BehavioralQuestions.jsx
    ├── SkillGaps.jsx
    └── PreparationPlan.jsx
```

### `axios.js`

```javascript
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export default api;
```

### `auth.api.js`

```javascript
import api from "./axios";

export const registerUser = (data) =>
  api.post("/auth/register", data);

export const loginUser = (data) =>
  api.post("/auth/login", data);

export const logoutUser = () =>
  api.get("/auth/logout");

export const getCurrentUser = () =>
  api.get("/auth/get-me");
```

### `interview.api.js`

```javascript
import api from "./axios";

export const generateInterviewReport = ({
  resume,
  selfDescription,
  jobDescription,
}) => {
  const formData = new FormData();

  formData.append("resume", resume);
  formData.append("selfDescription", selfDescription);
  formData.append("jobDescription", jobDescription);

  return api.post("/interview", formData);
};

export const getInterviewReport = (interviewId) =>
  api.get(`/interview/report/${interviewId}`);

export const getAllInterviewReports = () =>
  api.get("/interview/reports/interview");

export const generateResumePdf = (interviewReportId) =>
  api.post(
    `/interview/resume/pdf/${interviewReportId}`,
    {},
    {
      responseType: "blob",
    }
  );
```

---

# 13. Frontend Authentication Flow

```text
Register
   ↓
POST /auth/register
   ↓
JWT cookie created
   ↓
Dashboard
   ↓
GET /auth/get-me
   ↓
User authenticated
```

For login:

```text
Login Form
   ↓
POST /auth/login
   ↓
JWT cookie created
   ↓
GET /auth/get-me
   ↓
Dashboard
```

For logout:

```text
Logout button
   ↓
GET /auth/logout
   ↓
Cookie cleared
   ↓
Redirect to Login
```

---

# 14. Interview Generation Flow

```text
User uploads Resume PDF
        ↓
User enters Self Description
        ↓
User enters Job Description
        ↓
POST /api/interview
        ↓
Backend extracts PDF text
        ↓
Gemini AI analyzes candidate
        ↓
Interview Report saved in MongoDB
        ↓
Frontend receives report
        ↓
Display:
   ├── Match Score
   ├── Technical Questions
   ├── Behavioral Questions
   ├── Skill Gaps
   └── 7-Day Preparation Plan
```

---

# 15. Standard Frontend Error Handling

Recommended Axios handling:

```javascript
try {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  console.log(response.data);
} catch (error) {
  const message =
    error.response?.data?.message ||
    "Something went wrong";

  console.error(message);
}
```

For `401` responses:

```javascript
if (error.response?.status === 401) {
  // Clear frontend user state
  // Redirect to login
}
```

---

# 16. Important Frontend Notes

### 1. Always use credentials

Because authentication uses cookies:

```javascript
withCredentials: true
```

### 2. Do not store the JWT in localStorage

The backend already manages the JWT through the `token` cookie.

### 3. Resume upload uses `multipart/form-data`

Do not send the resume as JSON.

Correct:

```javascript
const formData = new FormData();
formData.append("resume", file);
```

### 4. Maximum resume size

```text
3 MB
```

### 5. PDF endpoint requires `responseType: "blob"`

Otherwise Axios will not correctly handle the returned PDF.

### 6. Reports belong to the logged-in user

The backend checks:

```javascript
user: req.user.id
```

when retrieving reports, so a user cannot retrieve another user's interview report through the normal report APIs.

---

# 17. Environment Configuration

For local development:

```text
Frontend:
http://localhost:5173

Backend:
http://localhost:3000

API:
http://localhost:3000/api
```

The backend currently allows CORS from:

```text
http://localhost:5173
```

with credentials enabled.

For production deployment, the backend CORS origin must be changed to the actual frontend domain.
