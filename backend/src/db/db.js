const mon = require("mongoose");

async function db(){
    await mon.connect(process.env.MON_URI);
    console.log("DB is Connected")
}

module.exports = db;