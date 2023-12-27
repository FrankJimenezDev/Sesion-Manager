import { DataSource } from "typeorm";
import { Loginsesion } from "../entity/loginsesion.entity";

export const db = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123456",
    database: "SesionManager",
    entities: [Loginsesion],
    synchronize: true,
    logging: false,
    
})