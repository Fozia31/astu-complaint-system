import './loadEnv.js';
import express from 'express';
import authRoutes from './routes/auth.route.js';
import studentComplaintRoutes from './routes/complaint/student.route.js';
import adminComplaintRoutes from './routes/complaint/admin.route.js';
import categoryRoutes from './routes/categories.route.js';
import userRoutes from './routes/user.route.js';
import analyticsRoutes from './routes/analytics.route.js';
import staffComplaintRoutes from './routes/complaint/staff.route.js';
import chatbotRoutes from './routes/chatbot.route.js';
import { connectDB } from './config/db.js';
import cors from 'cors';
import { seedAdmin } from './utils/seeder.js';

import http from 'http';


const corsOptions = {
    origin: ['http://localhost:5173'], 
    methods: ['GET','POST','PUT','DELETE','PATCH'],
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

app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api', studentComplaintRoutes);
app.use('/api', categoryRoutes);
app.use('/api', userRoutes);
app.use('/api',analyticsRoutes);
app.use('/api',adminComplaintRoutes);
app.use('/api',staffComplaintRoutes)
app.use('/api',chatbotRoutes);


// Add this temporarily at the top of your server.js
// const http = require('http');

// Make a request to an external service to see your IP
http.get('http://api.ipify.org', (resp) => {
  let data = '';
  resp.on('data', (chunk) => { data += chunk; });
  resp.on('end', () => {
    console.log('✅ Your Render outbound IP is:', data);
  });
}).on('error', (err) => {
  console.log('Error getting IP:', err.message);
});



const startServer = () =>{
    app.listen(PORT,async()=>{
        console.log(`Server is running on port http://localhost:${PORT}`);
        await connectDB();
        await seedAdmin();
    })
}
startServer();