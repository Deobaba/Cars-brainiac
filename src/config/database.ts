
import mongoose from 'mongoose';
import { ENVIRONMENT } from './env';

const environment = ENVIRONMENT.APP.ENV;

export const connectDB = async () => {
    try {
        await mongoose.connect(ENVIRONMENT.DB.URL, {
            connectTimeoutMS:20000
        });
        console.log(`✅ MongoDB Connected to ${environment} database`);
    } catch (error: any) {
        console.error(`❌ Unable to connect to the database: ${error.message}`);
        // try to reconnect after 5 seconds
        setTimeout(connectDB, 5000);
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

