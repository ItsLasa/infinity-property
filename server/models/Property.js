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
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    images: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
            const rawValue = this.getDataValue('images');
            return rawValue ? rawValue.split(',') : [];
        },
        set(val) {
            this.setDataValue('images', Array.isArray(val) ? val.join(',') : val);
        }
    },
    mapUrl: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    amenities: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
            const rawValue = this.getDataValue('amenities');
            return rawValue ? rawValue.split(',') : [];
        },
        set(val) {
            this.setDataValue('amenities', Array.isArray(val) ? val.join(',') : val);
        }
    }
});

module.exports = Property;
