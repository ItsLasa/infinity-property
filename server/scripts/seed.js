const { sequelize } = require('../config/db');
const Property = require('../models/Property');

const lands = [
  { name: 'Sunridge', location: 'Ballapitiya', price: '300,000', unit: 'Per Perch Upwards', image: 'https://plcms.primelands.lk/images/260516000544SunRidge_-_Ballapitiya_Thumbnail_PL_450x550.jpg', district: 'Galle', type: 'land', sqft: '10 Perches' },
  { name: 'Greenova', location: 'Berukatiya', price: '585,000', unit: 'Per Perch Upwards', image: 'https://plcms.primelands.lk/images/260515170542GREENOVA_-_Berukatiya_Thumbnail_PL_450x550.jpg', district: 'Kalutara', type: 'land', sqft: '10 Perches' },
  { name: 'Eldoria', location: 'Malkaduwawa', price: '890,000', unit: 'Per Perch Upwards', image: 'https://plcms.primelands.lk/images/260324160321Heraliyawala_Web-02.jpg', district: 'Kurunegala', type: 'land', sqft: '10 Perches' },
];

const houses = [
  { name: 'Courtyard By Prime', location: 'Thalawathugoda', price: '86,000,000', unit: 'Per Unit Upwards', beds: 5, baths: 4, sqft: '4,500', image: 'https://plcms.primelands.lk/images/260407130410COURTYARD_-_SAMAGI-MAWATHA_-_THALAWATHUGODA_PL_Website_Thumbnail_484x726.jpg', district: 'Colombo', type: 'house', status: 'New Launch' },
  { name: 'Kaloora', location: 'Kalutara', price: '22,000,000', unit: 'Per Unit Upwards', beds: 3, baths: 2, sqft: '1,500', image: 'https://plcms.primelands.lk/images/260604090615Kaloora-Web-thmbnail.webp', district: 'Kalutara', type: 'house', status: 'For Sale' },
];

const apartments = [
  { name: 'Mon Vie', location: 'Colombo 05', price: '45,000,000', unit: 'Per Unit Upwards', beds: 3, baths: 2, sqft: '1,400', image: 'https://plcms.primelands.lk/images/260605110624C_est_La_Vie_PL_Home_Slider_Desktop__1920x1080.webp', district: 'Colombo', type: 'apartment', status: 'Ongoing' },
];

const seedData = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('Database cleared and synchronized.');

        await Property.bulkCreate([...lands, ...houses, ...apartments]);
        console.log('Sample data seeded successfully.');

        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
