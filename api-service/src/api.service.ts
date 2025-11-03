import { Injectable } from '@nestjs/common';
import { KafkaProducerService } from './kafka-producer.service';
import { BookingResponseType, ReservationType } from './types/types';

@Injectable()
export class ApiService {
  constructor(private readonly _kafka: KafkaProducerService) {}

  async bookings(reservation: ReservationType): Promise<number> {
    const response = this._kafka.sendMessage('booking_topic', {
      msg: {
        date: reservation.date,
        time: reservation.time,
        idTable: reservation.idTable,
        status: 'CREATED',
      },
    });

    return response;
  }

  async bookingsById(id: number): Promise<BookingResponseType> {
    const response = await this._kafka.sendMessage('bookingById_topic', {
      msg: id,
    });

    return response;
  }
}
