import { NestFactory } from '@nestjs/core';
import { BookingModule } from './booking.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(BookingModule);

  // Подключаем Kafka Consumer как микросервис
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'booking-consumer',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'booking-consumer-group',
      },
    },
  });

  // Запускаем все микросервисы
  await app.startAllMicroservices();
  await app.listen(3001);

  console.log('🚀 App is running on http://localhost:3001');
  console.log('📡 Kafka consumer connected');
}

bootstrap();
