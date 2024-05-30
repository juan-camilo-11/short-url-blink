import { client } from "../connection";

export async function validateRegisteredUser(googleId: string): Promise<boolean> {
    try {
        const database = client.db("db");
        const collection = database.collection("users");

        const userFound = await collection.findOne({ googleId: googleId });
        return !!userFound;
    } catch (err) {
        throw err;
    }
}
