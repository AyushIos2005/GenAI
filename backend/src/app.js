const express = require("express");
const authRouter = require("./Routes/auth.route");
const interviewRouter = require("./Routes/interview.route");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();


// middleware 
app.use(cors({
    origin : "https://gen-a2ulfbyzo-vikki-s-projects-209c0941.vercel.app",
    credentials : true
}))
app.use(cookieParser());
app.use(express.json());

// api calls
app.get("/",(req,res)=>{
    res.status(200).json({
        message:"API Works Properly"
    })
})
app.use("/api/auth",authRouter);
app.use("/api/interview",interviewRouter);

// global error handler — makes sure every crash still returns JSON
// (without this, an uncaught error was returning Express's default HTML
// page, which is why the frontend only ever saw "Request failed with
// status code 500" with no real message).
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
        message: err.message || "Internal server error"
    });
});

module.exports = app;
