// routes/complaint/student.route.js
import express from 'express';
import { createComplaint, getComplaintById, getMyComplaints } from '../../controllers/complaint.controller.js';
import protect from '../../middleware/auth.middleware.js';

const router = express.Router();

router.post('/student/complaints', protect, createComplaint);

router.get('/student/complaints/my',protect , getMyComplaints);

router.get('/student/complaints/:id',protect, getComplaintById);

export default router;