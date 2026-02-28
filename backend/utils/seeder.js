import User from '../models/user.model.js';

export const seedAdmin = async () => {
    try {
        const adminExists = await User.findOne({ email: 'admin@astu.edu.et' });
        
        if (!adminExists) {
            const admin = new User({
                name: 'System Admin',
                email: 'admin@astu.edu.et',
                password: 'admin123', // Will be hashed by the pre-save hook
                role: 'admin',
                department: 'ICT'
            });
            await admin.save();
            console.log('✅ Admin account seeded successfully');
        }

        const staffExists = await User.findOne({ email: 'staff@astu.edu.et' });
        if (!staffExists) {
            const staff = new User({
                name: 'General Staff',
                email: 'staff@astu.edu.et',
                password: 'staff123',
                role: 'staff',
                department: 'Registrar'
            });
            await staff.save();
            console.log('✅ Staff account seeded successfully');
        }
    } catch (error) {
        console.error('❌ Seeding error:', error);
    }
};