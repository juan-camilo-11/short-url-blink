import { ObjectId } from 'mongodb';
import db from './db';

class User {
  private googleId: string;
  private displayName: string;
  private email: string;

  constructor(googleId: string, displayName: string, email: string) {
    this.googleId = googleId;
    this.displayName = displayName;
    this.email = email;
  }

  getGoogleId(): string {
    return this.googleId;
  }

  setGoogleId(googleId: string): void {
    this.googleId = googleId;
  }

  getDisplayName(): string {
    return this.displayName;
  }

  setDisplayName(displayName: string): void {
    this.displayName = displayName;
  }

  getEmail(): string {
    return this.email;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  //
  static async findByGoogleId(id: string) {
    const client = db.getClient();
    const database = client.db("db");
    const collection = database.collection("users");

    const user = await collection.findOne({ googleId: id });

    return user;
  }
  async create(user: User) {
    const client = db.getClient();
    const database = client.db("db");
    const collection = database.collection("users");

    try{
      await collection.insertOne(user);
    }
    catch(err){
      throw err;
    }

  }
}


export default User;
