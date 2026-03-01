import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7h' }
    );
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const userData = user.toObject();
        delete userData.password;

        return res.status(200).json({
            message: 'Login successful',
            data: userData,
            token: generateToken(user)
        });

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ message: 'Server error' });
    }
};

export const signUp = async (req, res) => {
    try {
        const { name, email, password, role, department } = req.body;
        
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        
        const newUser = new User({
            name,
            email,
            password,
            role: role || 'student',
            department
        });

        await newUser.save();

        const userData = newUser.toObject();
        delete userData.password;

        return res.status(201).json({
            message: 'User created successfully',
            data: userData,
            token: generateToken(newUser)
        });

    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).json({ message: 'Server error' });
    }
};