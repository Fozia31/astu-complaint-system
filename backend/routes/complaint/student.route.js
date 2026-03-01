import express from 'express';
import { createComplaint, getComplaintById, getMyComplaints } from '../../controllers/complaints/student.controller.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, 
});

router.post('/student/complaint', authMiddleware, upload.single('attachments'), createComplaint);
router.get('/student/complaints/my', authMiddleware, getMyComplaints);
router.get('/student/complaints/:id', authMiddleware, getComplaintById);

export default router;