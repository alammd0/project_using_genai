import app from './src/server.js';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';

dotenv.config();

connectDB();

// test route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server is running on port ${process.env.PORT || 4000}`);
});