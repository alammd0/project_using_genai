
import express from 'express';
import { createUser, getMe, loginUser, logoutUser } from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const authRouter = express.Router() ;

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access public
 */

authRouter.post('/register', createUser);

/**
 * @route POST /api/auth/login
 * @description Login a user with email and password
 * @access public
 * 
 */

authRouter.post('/login', loginUser);

/**
 * @route POST /api/auth/logout
 * @description Logout a user
 * @access public
 */

authRouter.get('/logout', logoutUser);

/**
 * @route POST /api/auth/get-me
 * @description Get user details
 * @access private
 */

authRouter.get("/get-me", authMiddleware, getMe)



export default authRouter;