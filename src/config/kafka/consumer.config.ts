
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

        this.consumer = this.kafka.consumer({ groupId: 'my-consumer-group' });
    }

    async setupKafkaConsumer() {
        await this.consumer.connect();
        await this.consumer.subscribe({ topic: 'my-topic', fromBeginning: true }); // Cambia a tu valor
    }

    async start() {
        console.log(`Consumer On`);
        await this.setupKafkaConsumer()
        await this.consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log({
                    topic,
                    partition,
                    value: message.value
                });

                if (message.value) {
                    try {
                      const value = JSON.stringify(message.value.toString());
                      console.log(`Received message: ${value}`);
                      // Aquí procesas el mensaje normalmente
                    } catch (error) {
                      console.error(`Error parsing message: ${error}`);
                    }
                  } else {
                    console.warn('Received null message, skipping...');
                  }
            },
        });
    }
}  