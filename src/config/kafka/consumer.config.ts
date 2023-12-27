
import { Kafka, Consumer } from 'kafkajs';
import { SesionManager } from '../../controllers/sesionmanager.controller';

export class KafkaConsumer {
    
    private kafka: Kafka;
    private consumer: Consumer;

    constructor() {
        // Configuración de Kafka
        this.kafka = new Kafka({
            clientId: 'MyKafkaIdClient',
            brokers: ['localhost:9092'], // Cambia esto con la dirección de tu servidor Kafka
        });

        this.consumer = this.kafka.consumer({ groupId: 'MyKafkaIdGroup' });
    }

    async setupKafkaConsumer() {
        await this.consumer.connect();
        await this.consumer.subscribe({ topic: 'test', fromBeginning: true }); // Cambia a tu valor
    }

    async start() {
        console.log(`Consumer On`);
        await this.setupKafkaConsumer()
        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log({
                    topic,
                    partition,
                    value: message.value!.toString,
                });

                const value = message.value!.toString();
                await new SesionManager().loginManager(JSON.parse(value))
            },
        });
    }
}  