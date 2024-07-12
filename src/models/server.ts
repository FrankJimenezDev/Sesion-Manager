import "dotenv/config"
import express, { Application } from "express"
import cors from "cors"
import { KafkaConsumer } from "../config/kafka/consumer.config";

export class Server {

    private app: Application;
    private port: number

    constructor() {
        this.app = express()
        this.port = Number(process.env.PORT) || 3000

        this.middlewares();

    }

    middlewares() {
        this.app.use(cors())
        this.app.use(express.json())
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