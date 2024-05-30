import { MongoClient } from 'mongodb';

const uri = process.env.DB_URI;
if (!uri) {
    throw new Error("Environment variable is not defined.");
}
export const client = new MongoClient(uri);

export async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB!');
    } catch (err) {
        console.error('Err:', err);
    }
}

export async function closeConnection() {
    try {
        await client.close();
        console.log('Disconnected from database');
    } catch (err) {
        console.error('Err:', err);
    }
}
