import { IsNull } from "typeorm"
import { DtoKafka } from "../interfaces/kafka.dto"

export class SesionManager {

    async loginManager(ObjetoKafka: DtoKafka) {

        try {
            console.log(ObjetoKafka);
        } catch (error) {
            console.log(`Error al cargar datos en login`);
            console.error(error)
        }
    }

    async logoutManager(ObjetoKafka: DtoKafka) {


        try {
            console.log(ObjetoKafka);
        } catch (error) {
            console.error(error)
        }


    }

}

