import express from 'express';
import {
    getDashboardStats,
    getTotalComplaints,
    getResolutionRate,
    getComplaintsByCategory,
    getMonthlyComplaints,
    getAverageResolutionTime
} from '../controllers/analytics.controller.js';

import { authMiddleware } from '../middleware/auth.middleware.js';
import { authorizeRoles } from '../middleware/role.middleware.js';

const router = express.Router();

router.get(
    '/analytics/dashboard-summary', 
    authMiddleware, 
    authorizeRoles("admin"), 
    getDashboardStats
);

router.get('/analytics/total', authMiddleware, authorizeRoles("admin"), getTotalComplaints);
router.get('/analytics/resolution-rate', authMiddleware, authorizeRoles("admin"), getResolutionRate);
router.get('/analytics/by-category', authMiddleware, authorizeRoles("admin"), getComplaintsByCategory);
router.get('/analytics/monthly', authMiddleware, authorizeRoles("admin"), getMonthlyComplaints);
router.get('/analytics/avg-resolution-time', authMiddleware, authorizeRoles("admin"), getAverageResolutionTime);

export default router;