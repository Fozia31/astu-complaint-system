import User from '../models/user.model.js';

export const getAllUsers = async (req,res) => {
    try{
        const users = await User.find().select('-password');
        return res.status(200).json({message: 'Users retrieved successfully',data:users});

    }catch(err){
        console.log(err)
        return res.status(500).json({message: 'Server error'});
    }
}

export const getUserById = async (req,res) => {
    try{
        const {id} = req.params;
        const user = await User.findById(id).select('-password');
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        return res.status(200).json({message: 'User retrieved successfully',data:user});

    }catch(err){
        console.log(err)
        return res.status(500).json({message: 'Server error'});
    }
}

export const updateUserRole = async(req,res) =>{
    try{
        const {id} = req.params;
        const {role} = req.body;

        const allowedRoles = ["student", "staff", "admin"];

        if (!allowedRoles.includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }

        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        
        user.role = role;
        await user.save();

        const updatedUser = await User.findById(id).select("-password");
        return res.status(200).json({
            message: 'User role updated successfully',
            data:updatedUser
        
        });

    }catch(err){
        console.log(err)
        return res.status(500).json({message: 'Server error'});
    }
}

export const deleteUser = async(req,res) =>{
    try{
        const {id} = req.params;
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({message:"User not Found"})
        }
        await User.findByIdAndDelete(id);
        return res.status(200).json({message: 'User deleted successfully'});

    }catch(err){
        console.log(err)
        return res.status(500).json({message: 'Server error'});
    }
}
