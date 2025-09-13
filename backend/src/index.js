import dotenv from 'dotenv';
import app from './app.js'; 
import connectDB from './db/db.js';
dotenv.config({ path: '../.env' });

connectDB()
.then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.log("Failed to connect to the database:", error);
});

