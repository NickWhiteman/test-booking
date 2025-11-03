import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaProducerService } from './kafka-producer.service';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BOOKING_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'api-producer',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'booking-consumer-group',
          },
        },
      },
    ]),
  ],
  providers: [KafkaProducerService, ApiService],
  controllers: [ApiController],
  exports: [KafkaProducerService],
})
export class ApiModule {}
