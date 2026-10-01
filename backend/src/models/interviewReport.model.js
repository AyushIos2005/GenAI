const mon = require("mongoose");

/* ===========================
   Technical Question Schema
=========================== */
const technicalQuestionSchema = new mon.Schema(
  {
    question: {
      type: String,
      required: [true, "Technical question is required"],
      trim: true,
    },
    intention: {
      type: String,
      required: [true, "Intention is required"],
      trim: true,
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
      trim: true,
    },
  },
  {
    _id: false,
  }
);

/* ===========================
   Behavioral Question Schema
=========================== */
const behavioralQuestionSchema = new mon.Schema(
  {
    question: {
      type: String,
      required: [true, "Behavioral question is required"],
      trim: true,
    },
    intention: {
      type: String,
      required: [true, "Intention is required"],
      trim: true,
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
      trim: true,
    },
  },
  {
    _id: false,
  }
);

/* ===========================
   Skill Gap Schema
=========================== */
const skillGapSchema = new mon.Schema(
  {
    skill: {
      type: String,
      required: [true, "Skill is required"],
      trim: true,
    },
    severity: {
      type: String,
      enum: {
        values: ["low", "medium", "high"],
        message: "{VALUE} is not a valid severity.",
      },
      required: [true, "Severity is required"],
    },
  },
  {
    _id: false,
  }
);

/* ===========================
   Preparation Plan Schema
=========================== */
const preparationPlanSchema = new mon.Schema(
  {
    day: {
      type: Number,
      required: [true, "Day is required"],
      min: 1,
    },
    focus: {
      type: String,
      required: [true, "Focus is required"],
      trim: true,
    },
    tasks: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
  },
  {
    _id: false,
  }
);

/* ===========================
   Interview Report Schema
=========================== */
const interviewReportSchema = new mon.Schema(
  {
    jobDescription: {
      type: String,
      required: [true, "Job description is required"],
      trim: true,
    },

    resume: {
      type: String,
      required: [true, "Resume is required"],
    },

    selfDescription: {
      type: String,
      required: [true, "Self description is required"],
      trim: true,
    },

    matchScore: {
      type: Number,
      // required: [true, "Match score is required"],
      min: 0,
      max: 100,
    },

    technicalQuestions: {
      type: [technicalQuestionSchema],
    },

    behavioralQuestions: {
      type: [behavioralQuestionSchema],
    },

    skillGaps: {
      type: [skillGapSchema],
    },

    preparationPlan: {
      type: [preparationPlanSchema],
    },

    user : {
      type:mon.Schema.Types.ObjectId,
      ref : "users"
    }
  },
  {
    timestamps: true,
  }
);

/* ===========================
   Model Export
=========================== */
const interviewReportModel = mon.model(
  "InterviewReport",
  interviewReportSchema
);

module.exports = interviewReportModel;