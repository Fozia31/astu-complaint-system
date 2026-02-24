import express from 'express';
import { getAssignedComplaints, updateComplaintStatus, addComplaintRemarks } from '../../controllers/complaint.controller.js';
const router = express.Router();

router.get('/staff/complaints/assigned', getAssignedComplaints);

router.PATCH('/staff/complaints/:id/status', updateComplaintStatus);

router.post('/staff/complaints/:id/remarks', addComplaintRemarks);

export default router;