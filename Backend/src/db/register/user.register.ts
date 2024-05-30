import User from "../../models/user.model";
import {client} from "../connection";

export async function registerUser(user: User) {
    try {
        const database = client.db("db");
        const collection = database.collection("users");

        await collection.insertOne(user);
    } catch (err) {
        throw err;
    }
}