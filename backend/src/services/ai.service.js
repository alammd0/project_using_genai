import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema"
import dotenv from "dotenv";

dotenv.config();


// ADD normalizer step here: 
// function normalizeAIResponse(data) {
//     return {
//             ...data,

//             technicalQuestions: (data.technicalQuestions || []).map((q) =>
//                 typeof q === "string"
//                     ? {
//                         question: q,
//                         intention: "Explain core concept and depth",
//                         answer: "Structure your answer with definition, example, and use-case"
//                     }
//                     : q
//             ),

//             behavioralQuestions: (data.behavioralQuestions || []).map((q) =>
//                 typeof q === "string"
//                     ? {
//                         question: q,
//                         intention: "Assess communication and problem-solving",
//                         answer: "Use STAR method (Situation, Task, Action, Result)"
//                     }
//                     : q
//             ),

//             skillGaps: (data.skillGaps || []).map((s) =>
//                 typeof s === "string"
//                     ? {
//                         skill: s.split(":")[0] || s,
//                         severity: "medium"
//                     }
//                     : s
//             ),

//             preparationPlan: Array.isArray(data.preparationPlan)
//                 ? data.preparationPlan.map((item, index) =>
//                     typeof item === "string"
//                         ? {
//                             day: index + 1,
//                             focus: item,
//                             tasks: [item]
//                         }
//                         : item
//                     )
//                 : [],

//             title: data.title || "Full Stack Developer"
//     };
// }

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),

    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),

    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),

    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),

    title: z.string().describe("The title of the job for which the interview report is generated"),
})

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    try {

        const prompt = `You are an expert technical interviewer.
                        
                        Generate ONLY valid JSON. No explanation, no markdown.

                        STRICT RULES:
                            - Follow the schema EXACTLY
                            - Do NOT return strings where objects are required
                            - Every technicalQuestions item MUST be:
                                { 
                                  "question": "...", 
                                  "intention": "...", 
                                  "answer": "..." 
                                }
                            - Every behavioralQuestions item MUST be:
                                { 
                                  "question": "...",
                                  "intention": "...",
                                  "answer": "..." 
                                }
                            - Every skillGaps item MUST be:
                                { 
                                  "skill": "...", 
                                  "severity": "low | medium | high" 
                                }
                            - Every preparationPlan item MUST be:
                                { 
                                    "day": number, 
                                    "focus": "...", 
                                    "tasks": ["...", "..."] 
                                }

                            - matchScore must be 0-100

                            - Minimum:
                                - 5 technical questions
                                - 3 behavioral questions
                                - 3 skill gaps
                                - 7 preparation days

                            Return ONLY JSON.

                            Candidate Details:
                                Resume: ${resume}
                                Self Description: ${selfDescription}
                                Job Description: ${jobDescription}`;
                    
        const response = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite-preview",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseJsonSchema: zodToJsonSchema(interviewReportSchema),
            }
        })

        const parsed = JSON.parse(response.text);

        console.log(parsed);

    }
    catch (error) {
        console.log(error);
        throw new Error("AI failed to generate report")
    }
}

export default generateInterviewReport