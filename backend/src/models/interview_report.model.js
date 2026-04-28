
import mongoose from "mongoose";


const technicalSkillsSChema = new mongoose.Schema({
    question : {
        type : String,
        required : [true, "Technical Skills Question is Required"]
    }, 

    intention : {
        type : String, 
        required : [true, "Intention is Required"]
    },
    
    answer : {
        type : String,
        required : [true, "Answer is Required"]
    }

}, {
    _id : false
})

const behavioralSkillsSchema = new mongoose.Schema({
    question : {
        type : String,
        required : [true, "Behavioral Skills Question is Required"]
    }, 
    
    intention : {
        type : String, 
        required : [true, "Intention is Required"]
    },
    
    answer : {
        type : String,
        required : [true, "Answer is Required"]
    }
}, {
    _id : false
})

const skillGapSchema = new mongoose.Schema({
    skill : {
        type : String,
        required : [true, "Skill is Required"]
    },

    severity : {
        type : String,
        enum : ["Low", "Medium", "High"],
        required : [true, "Severity is Required"]
    }
}, {
    _id : false
})

const preparationSchema = new mongoose.Schema({
    day : {
        type : Number,
        required : [true, "Day is Required"]
    },

    focus : {
        type : String,
        required : [true, "Focus is Required"]
    },

    tasks : [
        {
            type : String,
            required : [true, "Task is Required"]
        }
    ]
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription : {
        type : String,
        required : [true, "Please Enter Job Description"]
    },

    resume : {
        type : String,
    },

    selfDescription : {
        type : String
    },

    matchScore : {
        type : Number,
        min : 0,
        max : 100
    },

    technicalQuestions : [technicalSkillsSChema],
    behavioralQuestions : [behavioralSkillsSchema],
    skillGap : [skillGapSchema],
    preparation : [preparationSchema]



} , {
    timestamps : true
})

const InterviewReport = mongoose.model("InterviewReport", interviewReportSchema);
export default InterviewReport;