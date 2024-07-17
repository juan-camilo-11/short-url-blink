import { ObjectId } from "mongodb";
import db from "./db";

class Url {
    private googleId: string;
    private status: string;
    private url: string;
    private shortUrl: string;
    private clicks: number;
    private date: string;

    constructor(googleId: string, status: string, url: string, shortUrl: string, clicks: number, date: string) {
        this.googleId = googleId;
        this.status = status;
        this.url = url;
        this.shortUrl = shortUrl;
        this.clicks = clicks;
        this.date = date;
    }

    static async findByGoogleId(id: string) {
        const client = db.getClient();
        const database = client.db("db");
        const collection = database.collection("urls");

        const urls = await collection.find({ googleId: id }).toArray();

        return urls;
    }

    static async findById(shortUrl: string) {
        const client = db.getClient();
        const database = client.db("db");
        const collection = database.collection("urls");

        const url = await collection.findOne({ shortUrl: shortUrl });

        return url;
    }

    static async findByIdAndUpdate(id: string, newUrl: Url) {
        const client = db.getClient();
        const database = client.db("db");
        const collection = database.collection("urls");

        const updatedUrl = await collection.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: newUrl },
            { returnDocument: 'after' }
        );

        if (!updatedUrl) {
            throw new Error('URL no encontrada');
        }

        return updatedUrl;
    }

    static async createUrl(url: Url) {
        const client = db.getClient();
        const database = client.db("db");
        const collection = database.collection("urls");

        try {
            await collection.insertOne(url);
            return "Exitoso";
        }
        catch (err) {
            throw err;
        }
    }

    static async deleteById(id: string) {
        const client = db.getClient();
        const database = client.db("db");
        const collection = database.collection("urls");

        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        return result.acknowledged && result.deletedCount > 0;;
    }


    static async isValidUrl(url: string) {
        if (!url || typeof url !== 'string') {
            return false;
        }
        const urlPattern = /^(https?:\/\/|ftp:\/\/|www\.)[^\s/$.?#].[^\s]*$/i;
        return urlPattern.test(url);
    }

    private static async validateShortUrlIsUnique(shortUrl: string) {
        const client = db.getClient();
        const database = client.db("db");
        const collection = database.collection("urls");

        const existing = await collection.findOne({ shortUrl: shortUrl });

        if (existing) {
            return true;
        }

        return false;
    }

    static async generateShortUrl() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomId = '';

        for (let i = 0; i < 7; i++) {
            randomId += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        const existingUrl = await this.validateShortUrlIsUnique(randomId);

        if (existingUrl) {
            return await Url.generateShortUrl();
        }

        return randomId;
    }
}

export default Url;