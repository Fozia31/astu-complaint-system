import express from 'express';

const router = express.Router();

router.get('/admin/complaints', getAllComplaints);

router.patch('/admin/complaints/:id/assigns', assignComplaintToStaff);

router.delete('/admin/complaints/:id', deleteComplaint);
    
export default router;