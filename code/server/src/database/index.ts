/**
 * Establishes a connection to the MongoDB database and initializes the user, chat, and post collections.
 * 
 * @returns {Promise<void>} A promise that resolves when the connection is successfully established.
 * 
 * @remarks
 * This file is responsible for establishing a connection to the MongoDB database and initializing the user, chat, and post collections.
 * The `runDB` function is an asynchronous function that connects to the database using the provided DB_URL.
 * It initializes the `userCollection`, `chatCollection`, and `postCollection` variables with the corresponding collections from the "main" database.
 * If the connection is successfully established, a success message is logged to the console.
 * If an error occurs during the connection process, the error is logged to the console.
 */
import { Collection, MongoClient, ServerApiVersion } from 'mongodb';
import 'dotenv/config'
import User from "@/interfaces/userModel";
import * as process from "process";
import Chat from "@/interfaces/chatModel";
import { Post } from "@/interfaces/postModel";

const DB_URL = process.env.DB_URL || ""
console.log("DB URL HERE: ***** ", DB_URL)
export const client = new MongoClient(DB_URL, {
    serverApi: {
        version: ServerApiVersion.v1,
    }
});

let mainDatabase;
export let userCollection: Collection<any>;
export let chatCollection: Collection<any>;
export let postCollection: Collection<any>;

/**
 * Establishes a connection to the MongoDB database and initializes the user, chat, and post collections.
 * 
 * @returns {Promise<void>} A promise that resolves when the connection is successfully established.
 */
export async function runDB(): Promise<void> {
    try {
        await client.connect();
        mainDatabase = client.db("main");
        userCollection = mainDatabase.collection("users")
        chatCollection = mainDatabase.collection("chats")
        postCollection = mainDatabase.collection("posts")
        console.log("Connected to database.")
    } catch (e) {
        console.log(e)
    }
}
