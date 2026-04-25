
import jwt from "jsonwebtoken";
import BlockListToken from "../models/blocklist.model.js";


export const authMiddleware = async (req, res, next) => {

    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({
            message : "Please login to access this route"
        })
    }

    const isTokenInBlockList = await BlockListToken.findOne({
        token  : token 
    });

    if(isTokenInBlockList) {
        return res.status(401).json({
            message : "Please login to access this route"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    }
    catch (error) {
        return res.status(500).json({
            message : "Internal Server Error"
        })
    }
}