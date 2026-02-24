import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import { connectDB } from './config/db.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use('/api/auth', authRoutes);


const startServer = () =>{
    app.listen(PORT,async()=>{
        console.log(`Server is running on port http://localhost:${PORT}`);
        await connectDB();
    })
}
startServer();