
import express from 'express';
import { createUser, loginUser, logoutUser } from '../controllers/user.controller.js';

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
 * @route POST /api/auth/blacklist
 * @description Add a token to blacklist
 * @access public
 * 
 */

// authRouter.post('/blacklist', );



export default authRouter;