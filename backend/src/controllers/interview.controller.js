import { PDFParse } from "pdf-parse";
import generateInterviewReport from "../services/ai.service.js";
import interviewReportModel from "../models/interview_report.model.js";


export const generateInterviewReportController = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Resume file is required"
            });
        }

        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const { jobDescription, selfDescription } = req.body;

        if (!jobDescription || !selfDescription) {
            return res.status(400).json({
                message: "Job description and self description are required"
            });
        }

        console.log("Hit Here - 01");

        const data = new PDFParse(Uint8Array.from(req.file.buffer));
        const resumeContent = await data.getText();

        if (!resumeContent) {
            return res.status(400).json({
                message: "Failed to extract resume content"
            });
        }

        const interviewReportByAI = await generateInterviewReport({
            resume: resumeContent.text,
            selfDescription,
            jobDescription
        });

        console.log(interviewReportByAI);
        console.log("Hit Here - 02");

        if (!interviewReportByAI) {
            throw new Error("AI failed to generate report");
        }

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
            ...interviewReportByAI
        });

        return res.status(201).json({
            message: "Interview report generated successfully",
            interviewReport
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};