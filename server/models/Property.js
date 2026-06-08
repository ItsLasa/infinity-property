const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Property = sequelize.define('Property', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    district: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false
    },
    unit: {
        type: DataTypes.STRING,
        defaultValue: 'Per Unit Upwards'
    },
    type: {
        type: DataTypes.ENUM('land', 'house', 'apartment'),
        allowNull: false
    },
    beds: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    baths: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    sqft: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'For Sale'
    },
    isFeatured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = Property;
