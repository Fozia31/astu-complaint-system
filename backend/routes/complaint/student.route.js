import express from 'express';
import { createComplaint, getComplaintById, getMyComplaints } from '../../controllers/complaint.controller.js';
import protect from '../../middleware/auth.middleware.js';

const router = express.Router();

router.post('/complaints', protect, createComplaint);

router.get('/complaints/my',protect , getMyComplaints);

router.get('/complaints/:id',protect, getComplaintById);

export default router;