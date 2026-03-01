// backend/routes/complaint/admin.route.js
import express from 'express';
import { authorizeRoles } from '../../middleware/role.middleware.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';
import { getAllComplaints, assignComplaintToStaff, deleteComplaint ,getComplaintById,getStaffList} from '../../controllers/complaints/admin.controller.js';

const router = express.Router();

router.get('/admin/complaints',authMiddleware, authorizeRoles("admin"), getAllComplaints);

router.patch('/admin/complaints/:id/assign',authMiddleware, authorizeRoles("admin"), assignComplaintToStaff);

router.get('/admin/complaints/:id', authMiddleware, authorizeRoles("admin"), getComplaintById);

router.delete('/admin/complaints/:id', authMiddleware, authorizeRoles("admin"), deleteComplaint);

router.get('/admin/staff-list', authMiddleware, authorizeRoles("admin"), getStaffList);
    
export default router;