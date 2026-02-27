import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';

export const login = async(req,res) => {
    try{
        const {email,password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: 'Invalid email or password'});
        }
        
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message: 'Invalid email or password'});
        }
        return res.status(200).json({
            message: 'Login successful',
            data:user,
            token:generateToken(user)
            
        })

    }catch(err){
        res.status(500).json({message: 'Server error'});
    }
}

export const signUp = async (req,res) => {
    try{
        const {name,email,password,role,department} = req.body;
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: 'User already exists'});
        }
        
        const newUser = new User({
            name,
            email,
            password,
            role:role || 'student',
            department
        })
        await newUser.save();

        return res.status(201).json({
            message: 'User created successfully',
            data:newUser,
            token:generateToken(newUser)
        })

    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Server error'});
    }
}
console.log("SIGNING SECRET:", process.env.JWT_SECRET);
const generateToken = (user) => {
    return jwt.sign({id: user._id,role:user.role},process.env.JWT_SECRET,{
        expiresIn:'7h'
    });

}