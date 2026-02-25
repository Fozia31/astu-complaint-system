// backend/routes/complaint/admin.route.js
import express from 'express';
import authorizeRoles from '../../middleware/role.middleware.js';
import protect from '../../middleware/auth.middleware.js';
import { getAllComplaints, assignComplaintToStaff, deleteComplaint } from '../../controllers/complaints/admin.controller.js';

const router = express.Router();

router.get('/admin/complaints',protect, authorizeRoles("admin"), getAllComplaints);

router.patch('/admin/complaints/:id/assign',protect, authorizeRoles("admin"), assignComplaintToStaff);

router.delete('/admin/complaints/:id', protect, authorizeRoles("admin"), deleteComplaint);
    
export default router;