const express = require("express")
const authController = require("../controllers/auth.controller")
const authRouter = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
/**
 * @route POST/api/auth/register
 * @desp Register a new user 
  * @access Public 
 */
authRouter.post("/register",authController.register_user);
/**
 * @route POST/api/auth/login
 *@desp Login with email and password
  * @access Public
 */

authRouter.post("/login",authController.loginUserController);
/**
 * @route GET/api/auth/logout
 * @desp clear token from user cookie and add the token in blacklist
 * @access Public
 */

authRouter.get("/logout",authController.logoutuserController);

/**
 * @route GET/api/auth/get-me
 * @desp get the current logged in user details 
 * @access private
 */

authRouter.get("/get-me",authMiddleware.authUser,authController.getMeController);

module.exports = authRouter;
