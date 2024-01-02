import { IsNull } from "typeorm"
import { db } from "../config/db/dbconnection"
import { Loginsesion } from "../config/entity/loginsesion.entity"
import { DtoKafka } from "../interfaces/kafka.dto"

export class SesionManager {

    async loginManager(ObjetoKafka: DtoKafka) {

        const {
            id,
            status,
            email,
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
            console.log(`Error al cargar datos en login`);
            console.error(error)
        } 
    }

    async logoutManager(ObjetoKafka: DtoKafka) {

        const {
            email,
            fecha
        } = ObjetoKafka

        const loginSesionDB = db.getRepository(Loginsesion)

        try {

            const loginSesion = await loginSesionDB.find({
                where: {
                    email,
                    logoutAt : IsNull(),
                },
                order: {
                    loginAt : "desc"
                }
            
            })

            if (!loginSesion) {
                console.log(`no se encontro sesion con el email`);
                return;
            }

            loginSesion.forEach(element => {
                loginSesionDB.merge( element, {logoutAt : fecha})
            });

            // loginSesionDB.merge( loginSesion, { logoutAt: fecha })

            await loginSesionDB.save(loginSesion);

            console.log(`fecha de logout agregada`);
            
        } catch (error) {
            console.log(`Error al cargar datos en logout`);
            console.error(error)
        }


    }

}

