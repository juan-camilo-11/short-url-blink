import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.DB_URI;
if (!uri) {
    throw new Error("Environment variable DB_URI is not defined.");
}

class Database {
    private static instance: Database;
    private client: MongoClient;

    private constructor() {
        this.client = new MongoClient(uri!);
    }

    static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    async connect() {
        try {
            await this.client.connect();
            console.log('Connected to MongoDB!');
        } catch (err) {
            throw err;
        }
    }

    async close() {
        try {
            await this.client.close();
            console.log('Disconnected from database');
        } catch (err) {
            throw err;
        }
    }

    getClient() {
        return this.client;
    }
}

export default Database.getInstance();
