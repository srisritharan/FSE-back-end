// imports the mongodb client
import { MongoClient } from "mongodb";
import log from '../../utils/log.js';
import dotenv from "dotenv"; // to load in the environment vars
dotenv.config();

const connectionString = process.env.DBbaseUrl || 'mongodb://127.0.0.1:27017';
export const client = new MongoClient(connectionString);

//Connect to mongodb
export async function dbConnect() {
    try {
        await client.connect();
        log(`MongoDB Connected ${connectionString}`);
    } catch (err) {
        log(err);
        log("DB CONNECTION FAILED. Is database running?")
    }
};