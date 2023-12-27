import "dotenv/config"
import express, { Application } from "express"
import cors from "cors"
import { db } from '../config/db/dbconnection';
import { KafkaConsumer } from "../config/kafka/consumer.config";

export class Server {

    private app: Application;
    private port: number

    constructor() {
        this.app = express()
        this.port = Number(process.env.PORT) || 3000

        this.middlewares();
        this.db()

    }

    middlewares() {
        this.app.use(cors())
        this.app.use(express.json())
    }

    async db() {
        try {
            await db.initialize()
            console.log(`Base de datos iniciada correctamente`);
        } catch (error) {
            console.log(`Hubo un problema al iniciar la base de datos`);
            console.error(error)
        }
    }

    async kafka() {
        new KafkaConsumer().start()
        this.listen()
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en: http://localhost:${this.port}`);
        })
    }

}