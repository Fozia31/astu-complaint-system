import express from 'express';
import { 
    getAssignedComplaints, 
    getComplaintById, 
    updateComplaintStatus, 
    addComplaintRemarks ,
    getStaffDashboardSummary
} from '../../controllers/complaints/staff.controller.js'; 
import { authMiddleware } from '../../middleware/auth.middleware.js';
import { authorizeRoles } from '../../middleware/role.middleware.js';

const router = express.Router();

router.get('/staff/assigned-complaints', authMiddleware, authorizeRoles("staff"), getAssignedComplaints);

router.get('/staff/dashboard-summary', authMiddleware, authorizeRoles("staff"), getStaffDashboardSummary);

router.get('/staff/complaints/:id', authMiddleware, authorizeRoles("staff"), getComplaintById);

router.patch('/staff/complaints/:id/status', authMiddleware, authorizeRoles("staff"), updateComplaintStatus);

// 4. Add remarks/comments
router.post('/staff/complaints/:id/remarks', authMiddleware, authorizeRoles("staff"), addComplaintRemarks);

export default router;