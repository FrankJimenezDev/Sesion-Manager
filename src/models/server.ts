import "dotenv/config"
import express, { Application } from "express"

export class Server {
    private app : Application;
    private port : number
    constructor(){
        this.app = express()
        this.port = Number(process.env.PORT) || 3000
    }


    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Servidor corriendo en: http://localhost:${this.port}`);   
        })
    }

}