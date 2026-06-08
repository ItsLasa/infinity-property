const { sequelize } = require('../config/db');
const User = require('../models/User');

const createAdmin = async () => {
    try {
        // Ensure database connection and models are synced
        await sequelize.authenticate();
        await sequelize.sync(); // Create tables if they don't exist
        
        const adminEmail = 'admin@infinity.com';
        const adminPassword = 'admin123'; // You can change this here

        const adminExists = await User.findOne({ where: { email: adminEmail } });

        if (adminExists) {
            console.log('Admin user already exists.');
        } else {
            await User.create({
                name: 'System Admin',
                email: adminEmail,
                password: adminPassword,
                isAdmin: true
            });
            console.log('-----------------------------------');
            console.log('Admin account created successfully!');
            console.log(`Email: ${adminEmail}`);
            console.log(`Password: ${adminPassword}`);
            console.log('-----------------------------------');
        }
        process.exit();
    } catch (error) {
        console.error('Error creating admin user:', error);
        process.exit(1);
    }
};

createAdmin();
