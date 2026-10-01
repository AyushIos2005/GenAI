//-2:10:32 ...... 
const pdfParse = require("pdf-parse")
const { generateInterviewReport, generateResumePdf } = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");



async function generateInterVeiwReportController(req,res){

 if(!req.file){
    return res.status(400).json({
        message : "Resume file is required (field name: 'resume')"
    })
 }

 const {selfDescription,jobDescription} = req.body;

 if(!selfDescription || !jobDescription){
    return res.status(400).json({
        message : "selfDescription and jobDescription are required in the request body"
    })
 }

 const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()

 // generateInterviewReport() already saves the document (with user attached)
 // and returns the saved Mongoose doc — no need to create() again here.
 const interviewReport = await generateInterviewReport({
    user : req.user.id,
    resume : resumeContent.text,
    selfDescription,
    jobDescription
 })

 res.status(201).json({
    message : "Interview Report Genearate Succfesscully",
    interviewReport
 })



}

async function getById(req,res){
  try {
        const { interviewId } = req.params; 
        const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id }); 

        if (!interviewReport) { 
            return res.status(404).json({ message: "Interview report not found" }); 
        } 

        res.status(200).json({ message: "Interview report fetched successfully.", interviewReport }); 
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

async function getAll(req,res){
    try {
        // Changed findOne to find to actually get all reports
        const interviewReports = await interviewReportModel.find({ user: req.user.id }); 

        // Added missing comma after the message string
        return res.status(200).json({ message: "Interview reports fetched successfully.", interviewReports }); 
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

async function generateResumePdfController(req,res){
    const { interviewReportId } = req.params;

    if(!interviewReportId){
        return res.status(401).json({
            message : "Interview Report not Found."
        })
    }

    const interviewReport = await interviewReportModel.findOne({ _id: interviewReportId, user: req.user.id });

    if(!interviewReport){
        return res.status(404).json({
            message : "Interview Report not Found."
        })
    }

    const { resume,jobDescription,selfDescription } = interviewReport


    const pdfBuffer = await generateResumePdf({resume,jobDescription,selfDescription})

    res.set({
        "Content-Type" : "application/pdf",
        "Content-Disposition" : `attachment; filename=resume_${interviewReportId}.pdf`
    })

    res.send(pdfBuffer);
}

module.exports = {generateInterVeiwReportController,getById,getAll,generateResumePdfController}