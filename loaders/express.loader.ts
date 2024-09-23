import { Application, json, urlencoded } from "express";
import router from '../api/index.api';
//import errorMiddleware from "../api/middlewares/error.middleware";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

export default async ({ app }: { app: Application }) => {
    app.use(cors((req, callback) => {
        console.log(`CORS enabled for: ${req.method} ${req.url}`);
        callback(null, { origin: true });
    }));
    app.use(json());
    app.use(urlencoded({ extended: false }));
    
    app.use('/node', router());

    app.get('/', (req, res) => {
        res.send('<h1>Hello</h1>')
    });

    // app.use(errorMiddleware);
};
