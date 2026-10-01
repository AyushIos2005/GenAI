const mon = require("mongoose");

const userSchema = new mon.Schema({
    username : {
        type : String,
        unique : [true,"username is already taken"],
        required : true
    },
    email : {
        type : String,
        unique : [true,"Account already exists with this email address"]
    },
    password : {
        type : String,
        required : true
    }
})

const userModel = mon.model("users",userSchema);

module.exports = userModel;