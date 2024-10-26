import mongoose from 'mongoose';
import { ENVIRONMENT } from './env';

const environment = ENVIRONMENT.APP.ENV;

export const connectDB = async () => {
    try {
        await mongoose.connect(ENVIRONMENT.DB.URL);
        console.log(`✅ MongoDB Connected to ${environment} database`);
    } catch (error: any) {
        console.error(`❌ Unable to connect to the database: ${error.message}`);
        process.exit(1);
    }
};

// Function to disconnect from MongoDB
export const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        console.log(`✅ MongoDB Disconnected from ${environment} database`);
    } catch (error: any) {
        console.error(`❌ Unable to disconnect from the database: ${error.message}`);
    }
};

