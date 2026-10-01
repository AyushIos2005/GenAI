const { GoogleGenAI, Type } = require("@google/genai");
const { z } = require("zod");
const puppeteer = require("puppeteer");

const interviewReportModel = require("../models/interviewReport.model");
const { default: zodToJsonSchema } = require("zod-to-json-schema");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

/* ===========================
   Gemini-native Response Schema
   NOTE: Gemini's responseSchema does NOT follow standard
   JSON Schema (lowercase types). It needs its own Type enum
   (OBJECT, STRING, NUMBER, ARRAY, BOOLEAN, INTEGER).
   zodToJsonSchema() outputs lowercase types, which Gemini
   silently mishandles -> causes fields like matchScore to
   randomly go missing. So we define this schema by hand.
=========================== */

const interviewReportSchema = {
  type: Type.OBJECT,
  properties: {
    matchScore: {
      type: Type.NUMBER,
      description:
        "A score between 0 and 100 indicating how well the candidate matches the job description.",
    },
    technicalQuestions: {
      type: Type.ARRAY,
      description: "List of technical interview questions.",
      items: {
        type: Type.OBJECT,
        properties: {
          question: {
            type: Type.STRING,
            description: "Technical interview question.",
          },
          intention: {
            type: Type.STRING,
            description: "Why the interviewer asks this question.",
          },
          answer: {
            type: Type.STRING,
            description: "Ideal answer with key points.",
          },
        },
        required: ["question", "intention", "answer"],
        propertyOrdering: ["question", "intention", "answer"],
      },
    },
    behavioralQuestions: {
      type: Type.ARRAY,
      description: "Behavioral interview questions.",
      items: {
        type: Type.OBJECT,
        properties: {
          question: {
            type: Type.STRING,
            description: "Behavioral interview question.",
          },
          intention: {
            type: Type.STRING,
            description: "Purpose of asking this behavioral question.",
          },
          answer: {
            type: Type.STRING,
            description: "Suggested answer using STAR method.",
          },
        },
        required: ["question", "intention", "answer"],
        propertyOrdering: ["question", "intention", "answer"],
      },
    },
    skillGaps: {
      type: Type.ARRAY,
      description: "List of skill gaps identified from resume vs job description.",
      items: {
        type: Type.OBJECT,
        properties: {
          skill: {
            type: Type.STRING,
            description: "Missing or weak skill.",
          },
          severity: {
            type: Type.STRING,
            enum: ["low", "medium", "high"],
            description: "Severity of the skill gap.",
          },
        },
        required: ["skill", "severity"],
        propertyOrdering: ["skill", "severity"],
      },
    },
    preparationPlan: {
      type: Type.ARRAY,
      description: "Day-wise preparation plan.",
      items: {
        type: Type.OBJECT,
        properties: {
          day: {
            type: Type.NUMBER,
            description: "Preparation day.",
          },
          focus: {
            type: Type.STRING,
            description: "Focus topic for the day.",
          },
          tasks: {
            type: Type.ARRAY,
            description: "Tasks to complete.",
            items: { type: Type.STRING },
          },
        },
        required: ["day", "focus", "tasks"],
        propertyOrdering: ["day", "focus", "tasks"],
      },
    },
  },
  required: [
    "matchScore",
    "technicalQuestions",
    "behavioralQuestions",
    "skillGaps",
    "preparationPlan",
  ],
  propertyOrdering: [
    "matchScore",
    "technicalQuestions",
    "behavioralQuestions",
    "skillGaps",
    "preparationPlan",
  ],
};

/* ===========================
   Generate Interview Report
=========================== */

async function generateInterviewReport({
  user,
  resume,
  selfDescription,
  jobDescription,
}) {
  try {
    const prompt = `
You are a Senior Technical Interviewer.

Analyze the candidate profile and generate an interview report.

Candidate Resume:
${resume}

Candidate Self Description:
${selfDescription}

Job Description:
${jobDescription}

Instructions:

1. Give a match score (0-100).
2. Generate 10 technical interview questions.
3. Generate 5 behavioral interview questions.
4. Find important skill gaps.
5. Create a 7-day preparation plan.
6. Return ONLY valid JSON matching the given schema exactly. Do not omit any field, including matchScore.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash", // current GA model as of Aug 2026
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: interviewReportSchema,
      },
    });

    let report;
    try {
      report = JSON.parse(response.text);
    // console.log(response.text)
    } catch (parseErr) {
      console.error("Raw Gemini response (JSON parse failed):", response.text);
      throw new Error("Model did not return valid JSON.");
    }

    // Defensive check: fail loudly and clearly instead of letting
    // Mongoose throw a vague ValidationError deep in model.create()
    const requiredFields = [
      "matchScore",
      "technicalQuestions",
      "behavioralQuestions",
      "skillGaps",
      "preparationPlan",
    ];
    const missingFields = requiredFields.filter(
      (field) => report[field] === undefined || report[field] === null
    );

    if (missingFields.length > 0) {
      console.error("Gemini response missing fields:", missingFields);
      console.error("Full response received:", JSON.stringify(report, null, 2));
      throw new Error(
        `Model response missing required field(s): ${missingFields.join(", ")}`
      );
    }

    const savedReport = await interviewReportModel.create({
      user,
      resume,
      selfDescription,
      jobDescription,
      ...report,
    });

    return savedReport;
  } catch (error) {
    console.error("Interview Report Generation Error:", error);

    throw new Error(`Failed to generate interview report: ${error.message}`);
  }
}


async function generatePdfFromHtml(htmlContent) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();

    await page.setContent(htmlContent, {
      waitUntil: "networkidle0",
    });

    return await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20px",
        right: "20px",
        bottom: "20px",
        left: "20px",
      },
    });
  } finally {
    await browser.close();
  }
}

async function generateResumePdf({
  resume,
  selfDescription,
  jobDescription,
}) {
  const resumePdfSchema = {
    type: Type.OBJECT,
    properties: {
      html: {
        type: Type.STRING,
        description:
          "Complete professional HTML resume suitable for A4 PDF generation using Puppeteer.",
      },
    },
    required: ["html"],
    propertyOrdering: ["html"],
  };

  const prompt = `
Generate a professional, ATS-friendly resume for the candidate.

Candidate Resume:
${resume}

Candidate Self Description:
${selfDescription}

Job Description:
${jobDescription}

Requirements:
- Create a professional and simple resume.
- Tailor the resume to the job description.
- Do not invent experience, education, projects, or skills.
- Use clean HTML.
- Make it suitable for A4 PDF printing.
- Use inline CSS only.
- Return ONLY the JSON object matching the provided schema.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: resumePdfSchema,
    },
  });

  let jsonContent;

  try {
    jsonContent = JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Resume Response:", response.text);
    throw new Error("Gemini returned invalid JSON");
  }

  if (!jsonContent.html) {
    throw new Error("Gemini did not generate resume HTML");
  }

  const pdfBuffer = await generatePdfFromHtml(jsonContent.html);

  return pdfBuffer;
}

module.exports = {generateInterviewReport,generateResumePdf};