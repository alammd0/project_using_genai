import dotenv from 'dotenv';
dotenv.config();

import app from './src/server.js';
import connectDB from './src/config/db.js';
import { resume, selfDescription, jobDescription } from './src/services/temp.js';
import { generateInterviewReport } from './src/services/ai.service.js';



connectDB();


generateInterviewReport({ resume, selfDescription, jobDescription });


// test route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server is running on port ${process.env.PORT || 4000}`);
});