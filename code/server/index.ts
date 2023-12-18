/**
 * Initializes the server by running the database and starting the server.
 * 
 * @remarks
 * This file serves as the entry point for the server application.
 * It imports the necessary modules and functions to run the database and start the server.
 * The `runDB` function initializes the database and returns a promise.
 * The `startServer` function starts the server and returns a promise.
 * The `runDB` promise is chained with the `startServer` promise using the `then` method.
 * This ensures that the server is started only after the database is successfully initialized.
 */
import {runDB} from "@/src/database";
import startServer from "@/src/server";
runDB().then(startServer)