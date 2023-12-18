/**
 * Starts the server and initializes the necessary configurations.
 * 
 * @remarks
 * This function starts the server by creating an Express app, setting up SSL settings,
 * configuring middleware, creating an HTTPS server, and attaching Socket.IO routes.
 * It also starts the mail service and listens for incoming requests on the specified port.
 */
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';
import * as http from 'http';
import * as fs from 'fs'
import {startMailService} from "@/src/mail";
import { Server } from 'socket.io';
import {attachSocketRoutes} from "@/src/server/socketRoutes";

const startServer = () => {
    const app = express();

    app.use(
      cors({
        origin: [
          "*",
          "https://campus-connect-undefined.onrender.com",
          "https://100.20.92.101:3000",
          "https://44.225.181.72:3000",
          "https://44.227.217.144:3000",
        ],
      })
    );
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json({limit: '50mb'}));
    app.use('/', routes);

    const server = http.createServer(app)

    const io = new Server(server, {
      cors: ({
        origin: [
          "*",
          "https://campus-connect-undefined.onrender.com",
          "https://100.20.92.101:3000",
          "https://44.225.181.72:3000",
          "https://44.227.217.144:3000",
        ],
      }),
    }); // Create a new Socket.IO instance with CORS configuration

    attachSocketRoutes(io);

    const PORT = process.env.PORT || 3000;

    startMailService()

    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

export default startServer