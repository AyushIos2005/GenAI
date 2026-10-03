const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const blacklistModel = require("../models/blacklist.model");
const tokenBlacklistModel = require("../models/blacklist.model");

/**
 * @name registerUser 
 * @description
 * @acess Public
 */


async function register_user(req,res){
    const {username,email,password} = req.body;

    if(!username||!email||!password){
        return res.status(400).json({
            message: " Please Provide username,email and password"
        })
    }

    const isUserAlreadyExists = await userModel.findOne({
            $or:[
                {username},
                {email}
            ]
        }
    )

    if(isUserAlreadyExists){
        /** is UserAlready Exists.username === username */
        return res.status(400).json({
            message : "Account Already exist with  this email address or username"
         })
    }

    const hash =  await bcrypt.hash(password,10);

    const user = await userModel.create({
        username,
        email,
        password : hash
    });

    const token = jwt.sign({
        id : user._id,
        username : user.username
    },process.env.JWT_KEY,{
        expiresIn : "1d"
    }
    )

    res.cookie("token",token,{
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000
    });

    res.status(201).json({
        message : "User registered successfully",
        user : {
            id :user._id,
            username : user.username,
            email : user.email
        }
    })
}

/**
 * @name loginUser 
 * @description
 * @acess Public
 */

async function loginUserController(req,res){
    const {email , password} = req.body;

    const user = await userModel.findOne({ email });

    if(!user)
    {
        return res.status(400).json({
            message : "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
        return res.status(400).json({
            message : "Invalid email or password"
        })
    }

    const token = jwt.sign({
        id: user._id,
        username : user.username,
    },process.env.JWT_KEY,{
        expiresIn : "1d"
    })

    res.cookie("token",token,{
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000
    })
    res.status(200).json({
        message : "User LoggedIn Succefully",
        user : {
            id : user._id,
            username : user.username,
            email : user.email
        }
    })
}
/**
 * @name registerUser 
 * @description
 * @acess Public
 */
async function logoutuserController(req,res){
    const token = req.cookies.token 
    if(token){
        await tokenBlacklistModel.create({ token });
    }

    res.clearCookie("token",{
    httpOnly: true,
    secure: true,
    sameSite: "none"
})

    res.status(200).json({
        message : "User logged Out successfully"
    })

}

/**
 * @name registerUser 
 * @description
 * @acess Public
 */

async function getMeController(req,res){
    const user = await userModel.findById(req.user.id);

    res.status(200).json({
        message : "user detail fetched succesfully",
        user : {
            id : user._id,
            username : user.username,
            email: user.email
        }
    })
}

module.exports = {register_user,loginUserController,logoutuserController,getMeController};
