import { client } from "../connection";

export async function findUser(googleId: string) {
    try {
        const database = client.db("db");
        const collection = database.collection("users");
        
        const user = await collection.findOne({googleId: googleId});

        if (!user) {
            return null;
        }
        return user;
    } catch (err) {
        throw err;
    }
}
