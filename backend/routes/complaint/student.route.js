// routes/complaint/student.route.js
import express from 'express';
import { createComplaint,getComplaintById ,getMyComplaints} from '../../controllers/complaints/student.controller.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';

const router = express.Router();

router.post('/student/complaint', authMiddleware, createComplaint);

router.get('/student/complaints/my',authMiddleware , getMyComplaints);

router.get('/student/complaints/:id',authMiddleware, getComplaintById);

export default router;