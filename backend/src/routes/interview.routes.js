import express from 'express';
import { generateInterviewReportController } from '../controllers/interview.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/file.middleware.js';

const interviewRouter = express.Router();


/**
 * @route POST /api/interview/generate-interview-report
 * @description Generate an interview report for a candidate
 * @access private  
 * 
 */

interviewRouter.post('/generate-interview-report', authMiddleware, upload.single('resume'), generateInterviewReportController);

export default interviewRouter;
