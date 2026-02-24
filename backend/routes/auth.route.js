import express from 'express';
import { login, signUp } from '../controllers/auth.controller.js';

const router = express.Router();

// @route   POST api/auth/login
router.post('/login', login);

router.post('/sign-up',signUp)

router.post('/sign-out', (req, res) => {
    res.json({ message: 'Sign out route' });
})

export default router;