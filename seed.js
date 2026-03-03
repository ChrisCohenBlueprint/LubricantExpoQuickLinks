const mongoose = require('mongoose');
require('dotenv').config();
const Link = require('./models/Link');

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
        title: 'LinkedIn: Lubricant Expo',
        url: 'https://www.linkedin.com/company/lubricant-expo',
        order: 4
    },
    {
        title: 'LinkedIn: Lubricant Expo Middle East',
        url: 'https://www.linkedin.com/company/lubricant-expo-middle-east',
        order: 5
    },
    {
        title: 'LinkedIn: Lubricant Expo North America',
        url: 'https://www.linkedin.com/company/lubricant-expo-north-america',
        order: 6
    }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        await Link.deleteMany({}); // Clear existing links if any
        await Link.insertMany(links);

        console.log('Database seeded successfully!');
        process.exit();
    } catch (err) {
        console.error('Seed error:', err);
        process.exit(1);
    }
}

seed();
