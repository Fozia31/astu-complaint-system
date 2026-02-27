import './loadEnv.js';
import express from 'express';
import authRoutes from './routes/auth.route.js';
import studentComplaintRoutes from './routes/complaint/student.route.js';
import categoryRoutes from './routes/categories.route.js';
import { connectDB } from './config/db.js';
import cors from 'cors';

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

app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.originalUrl}`);
    next();
});

app.use('/api/auth', authRoutes);
app.use('/api', studentComplaintRoutes);
app.use('/api', categoryRoutes);


const startServer = () =>{
    app.listen(PORT,async()=>{
        console.log(`Server is running on port http://localhost:${PORT}`);
        await connectDB();
    })
}
startServer();