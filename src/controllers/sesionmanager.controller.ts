import { db } from "../config/db/dbconnection"
import { Loginsesion } from "../config/entity/loginsesion.entity"
import { DtoKafka } from "../interfaces/kafka.dto"

export class SesionManager {

    async loginManager(ObjetoKafka: DtoKafka) {

        const {
            id,
            status,
            email
        } = ObjetoKafka

        const loginSesionDB = db.getRepository(Loginsesion)

        try {

            const loginSesion = loginSesionDB.create({
                userId : id,
                status,
                email
            })

            await loginSesion.save()

            console.log(`Datos creados`);
            

        } catch (error) {
            console.log(`Error al cargar datos en lolginSesionDB`);
            console.error(error)
        }

    }

}



