import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import { connectDB } from './config/db.js';
import cors from 'cors';
dotenv.config();
const corsOptions = {
    origin: 'http://localhost:5173', 
    method: ['GET','POST','PUT','DELETE','PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials:true
}

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors(corsOptions));

app.use('/api/auth', authRoutes);


const startServer = () =>{
    app.listen(PORT,async()=>{
        console.log(`Server is running on port http://localhost:${PORT}`);
        await connectDB();
    })
}
startServer();