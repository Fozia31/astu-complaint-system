import express from 'express';
import {
    getTotalComplaints,
    getResolutionRate,
    getComplaintsByCategory,
    getMonthlyComplaints,
    getAverageResolutionTime
} from '../controllers/analytics.controller.js';


const router = express.Router();

router.get('/analytics/total', getTotalComplaints);
router.get('/analytics/resolution-rate', getResolutionRate);
router.get('/analytics/by-category', getComplaintsByCategory);
router.get('/analytics/monthly', getMonthlyComplaints);
router.get('/analytics/avg-resolution-time', getAverageResolutionTime);

export default router;