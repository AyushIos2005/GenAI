const express = require("express")

const interviewRouter = express.Router();
const authMiddleware = require("../middlewares/auth.middleware.js")
const interviewController = require("../controllers/interview.controller")
const upload = require("../middlewares/file.middleware")

interviewRouter.post("/",authMiddleware.authUser,upload.single("resume"),interviewController.generateInterVeiwReportController)
interviewRouter.get("/report/:interviewId",authMiddleware.authUser,interviewController.getById);
interviewRouter.get("/reports/interview",authMiddleware.authUser,interviewController.getAll)
interviewRouter.post("/resume/pdf/:interviewReportId",authMiddleware.authUser,interviewController.generateResumePdfController)


module.exports = interviewRouter;