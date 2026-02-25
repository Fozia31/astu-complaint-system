// backend/routes/complaint/staff.route.js
import express from 'express';
import { getAssignedComplaints, updateComplaintStatus, addComplaintRemarks } from '../../controllers/complaint.controller.js';
import protect from '../../middleware/auth.middleware.js';
import authorizeRoles from '../../middleware/role.middleware.js';


const router = express.Router();

router.get('/staff/complaints/assigned', protect, authorizeRoles("staff"), getAssignedComplaints);

router.patch('/staff/complaints/:id/status', protect, authorizeRoles("staff"), updateComplaintStatus);

router.post('/staff/complaints/:id/remarks', protect, authorizeRoles("staff"), addComplaintRemarks);

export default router;