import dotenv from 'dotenv';
dotenv.config();

import app from './src/server.js';
import connectDB from './src/config/db.js';


connectDB();

// test route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server is running on port ${process.env.PORT || 4000}`);
});