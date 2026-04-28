import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema"
import dotenv from "dotenv";
import { be } from "zod/v4/locales";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});


const interviewReportSchema = z.object({

    matchScore : z.number().describe("A score between 0 to 100 to indicate the match between resume and job description"),

    technicalQuestions : z.array(z.object({
        question : z.string().describe("The technical question can be ask in the interview"),
        intention : z.string().describe("The intention of interviewer behind to ask the question"),
        answer : z.string().describe("How to answer the question. What point to cover. What approach to take etc...")
    })).describe("Technical Questions can be ask in the interview along their intention and answer"),

    behavioralQuestions : z.array(z.object({
        question : z.string().describe("The behavioral question can be ask in the interview"),
        intention : z.string().describe("The intention of interviewer behind to ask the question"),
        answer : z.string().describe("How to answer the question. What point to cover. What approach to take etc...")
    })).describe("Behavioral Questions can be ask in the interview along their intention and answer"),

    skillGap : z.array(z.object({
        skill : z.string().describe("The skill gap can be ask in the interview"),
        severity : z.enum(["Low", "Medium", "High"]).describe("The severity of the skill gap")
    })),

    preparationPlan : z.array(z.object({
        day : z.number().describe("The day of the preparation plan"),
        focus : z.string().describe("The focus of the preparation plan"),
        tasks : z.array(z.string()).describe("The tasks to be done in the preparation plan")
    }))
})

export const generateInterviewReport = async ({ resume, selfDescription, jobDescription }) => {

    const prompt = `Given the following resume and self description, generate an interview report.
        Resume: ${resume}
        Self Description: ${selfDescription}
        Job Description: ${jobDescription}
    `

    try {

        const response = await ai.models.generateContent({
            model : "gemini-3-flash-preview",
            contents : prompt,
            config :{
                responseMimeType : "application/json",
                responseSchema : zodToJsonSchema(interviewReportSchema)
            }
        });

        console.log(JSON.parse(response.text));

    }
    catch (error) {
        console.error("Error:", error.message);
    }
}