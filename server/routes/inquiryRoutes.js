const express = require('express');
const Inquiry = require('../models/Inquiry');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

// @desc    Create new inquiry
// @route   POST /api/inquiries
router.post('/', async (req, res) => {
    try {
        const inquiry = await Inquiry.create(req.body);
        res.status(201).json(inquiry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc    Get all inquiries
// @route   GET /api/inquiries
router.get('/', protect, admin, async (req, res) => {
    const inquiries = await Inquiry.findAll({ order: [['createdAt', 'DESC']] });
    res.json(inquiries);
});

module.exports = router;
