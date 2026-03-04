const mongoose = require('mongoose');
require('dotenv').config();
const Link = require('./link');

const links = [
    {
        title: 'Lubricant Expo North America',
        url: 'https://lubricantexpo.com/na/',
        icon: 'assets/logo-na.png',
        order: 1
    },
    {
        title: 'Lubricant Expo Europe',
        url: 'https://lubricantexpo.com/eu/',
        icon: 'assets/logo-eu.png',
        order: 2
    },
    {
        title: 'Lubricant Expo Middle East',
        url: 'https://lubricantexpo.com/me/',
        icon: 'assets/logo-me.png',
        order: 3
    },
    {
        title: 'LinkedIn: North America',
        url: 'https://www.linkedin.com/company/lubricant-expo-north-america',
        icon: 'https://cdn-icons-png.flaticon.com/512/174/174857.png',
        order: 4
    },
    {
        title: 'LinkedIn: Middle East',
        url: 'https://www.linkedin.com/company/lubricant-expo-middle-east',
        icon: 'https://cdn-icons-png.flaticon.com/512/174/174857.png',
        order: 5
    },
    {
        title: 'LinkedIn: Europe',
        url: 'https://www.linkedin.com/company/lubricant-expo/',
        icon: 'https://cdn-icons-png.flaticon.com/512/174/174857.png',
        order: 6
    }
];

async function seed() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is missing in .env');
        }
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        await Link.deleteMany({}); // THIS WIPES THE OLD "GLOBAL" LINK
        await Link.insertMany(links);

        console.log('Database seeded successfully! Your live site is now clean.');
        process.exit();
    } catch (err) {
        console.error('Seed error:', err);
        process.exit(1);
    }
}

seed();
