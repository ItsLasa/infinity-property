const express = require('express');
const Property = require('../models/Property');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

// @desc    Fetch all properties
// @route   GET /api/properties
router.get('/', async (req, res) => {
    const { type } = req.query;
    const filter = type ? { where: { type } } : {};
    const properties = await Property.findAll(filter);
    res.json(properties);
});

// @desc    Fetch single property
// @route   GET /api/properties/:id
router.get('/:id', async (req, res) => {
    const property = await Property.findByPk(req.params.id);
    if (property) {
        res.json(property);
    } else {
        res.status(404).json({ message: 'Property not found' });
    }
});

// @desc    Create a property
// @route   POST /api/properties
router.post('/', protect, admin, async (req, res) => {
    try {
        const property = await Property.create(req.body);
        res.status(201).json(property);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc    Update a property
// @route   PUT /api/properties/:id
router.put('/:id', protect, admin, async (req, res) => {
    const property = await Property.findByPk(req.params.id);

    if (property) {
        await property.update(req.body);
        res.json(property);
    } else {
        res.status(404).json({ message: 'Property not found' });
    }
});

// @desc    Delete a property
// @route   DELETE /api/properties/:id
router.delete('/:id', protect, admin, async (req, res) => {
    const property = await Property.findByPk(req.params.id);

    if (property) {
        await property.destroy();
        res.json({ message: 'Property removed' });
    } else {
        res.status(404).json({ message: 'Property not found' });
    }
});

module.exports = router;
