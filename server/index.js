const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');

// Load models to ensure they are synchronized
require('./models/User');
require('./models/Property');
require('./models/Inquiry');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/properties', require('./routes/propertyRoutes'));
app.use('/api/inquiries', require('./routes/inquiryRoutes'));

app.get('/', (req, res) => {
    res.send('Infinity Property API is running...');
});

// Start Server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        const server = app.listen(PORT, () => {
            console.log('-------------------------------------------');
            console.log(`🚀 Server is LIVE on: http://localhost:${PORT}`);
            console.log('-------------------------------------------');
        });

        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.error(`❌ Error: Port ${PORT} is already in use (likely by MySQL).`);
                console.error('👉 Please change PORT to 5000 in your .env file.');
            } else {
                console.error('❌ Server error:', err);
            }
            process.exit(1);
        });
    } catch (error) {
        console.error('❌ Failed to connect to database:', error.message);
        process.exit(1);
    }
};

startServer();
