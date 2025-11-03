import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BookingService } from './booking.service';
import { Booking } from './entitys/Booking';
import { ReservationType } from './types/types';

@Controller()
export class BookingController {
  constructor(private readonly _bookingService: BookingService) {}

  @MessagePattern('booking_topic')
  async bookingCreate(
    @Payload() { msg }: { msg: ReservationType },
  ): Promise<number> {
    const response = await this._bookingService.createReservation(msg);
    return response;
  }

  @MessagePattern('bookingById_topic')
  async getBookingById(
    @Payload() { msg }: { msg: { id: number } },
  ): Promise<Booking> {
    const response = await this._bookingService.getById(msg.id);
    return response;
  }
}
