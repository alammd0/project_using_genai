import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import BlockListToken from "../models/blocklist.model.js";


/** 
 * @route POST /api/auth/register
 * @description Register a new user
 * @access public
 */

export const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        if( !username || !email || !password ) {
            return res.status(400).json({
                message : "Please provide username, email, and password"
            })
        } 

        const isUserAlreadyExist = await User.findOne({
            $or : [{ username }, { email }]
        });

        if( isUserAlreadyExist ) {
            return res.status(400).json({
                message : "Account already exists with this email"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username, 
            email, 
            password : hashedPassword
        });

        const token = jwt.sign({
            id : user._id, username :  user.username }, 
            process.env.JWT_SECRET,
            { expiresIn : '1d' });

        res.cookie("token", token);

        return res.status(201).json({
            message : "Account created Successfully",
            user : {
                id : user._id,
                username : user.username,
                email : user.email
            }
        })

    }
    catch (error){
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
}


/**
 * @route POST /api/auth/login
 * @description Login a user with email and password
 * @access public
 */

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if( !email || !password ) {
            return res.status(400).json({
                message : "Please provide email and password"
            })
        }

        const user = await User.findOne({
            email
        });

        if( !user ) {
            return res.status(400).json({
                message : "Account does not exist"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if( !isPasswordCorrect ) {
            return res.status(400).json({
                message : "Invalid Credentials"
            })
        }

        const token = jwt.sign({
            id : user._id, username :  user.username }, 
            process.env.JWT_SECRET,
            { expiresIn : '1d' });

        res.cookie("token", token);

        return res.status(200).json({
            message : "Login Successful",
            user : {
                id : user._id,
                username : user.username,
                email : user.email
            }
        })
    }
    catch (error) {
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
}

/**
 * @route POST /api/auth/logout
 * @description Logout a user
 * @access public
 */

export const logoutUser = async (req, res) => {
    try {
        console.log("Hit here - 01")
        const token = req.cookies.token;
        console.log(token);

        console.log("Hit here - 02")

        if(token){
            await BlockListToken.create({ token });
        }

        res.clearCookie("token");

        return res.status(200).json({
            message : "Logout Successful"
        })
    }
    catch (error) {
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
}

/**
 * @route GET /api/auth/get-me
 * @description Get user details
 * @access private
 */

export const getMe = async (req, res) => {
    try {

        // fetch the userId 

        console.log(req.user);

        const userId = req.user.id;

        console.log(userId);

        const user = await User.findById(userId) ; 

        if(!user) {
            return res.status(400).json({
                message : "User does not exist"
            })
        }

        return res.status(200).json({
            message : "User details fetched successfully",
            user : {
                id : user._id,
                username : user.username,
                email : user.email
            }
        })
    }
    catch (error) {
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
}
