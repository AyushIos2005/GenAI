require("dotenv").config();

const app = require("./src/app");
const db = require("./src/db/db");
// const {resume,selfDescription,jobDescription } = require("./src/services/temp");
// const generateInterviewReport = require("./src/services/ai.service");


db();
// generateInterviewReport({resume,selfDescription,jobDescription});

// invokeAi();

app.listen(3000,()=>{
    console.log("Sever is Runing..");
})
