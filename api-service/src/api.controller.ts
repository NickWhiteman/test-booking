import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiService } from './api.service';
import { BookingResponseType, ReservationType } from './types/types';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post('bookings')
  async bookings(
    @Body() reservation: ReservationType,
  ): Promise<{ id: number }> {
    const response = await this.apiService.bookings(reservation);

    return { id: response };
  }

  @Get('bookings/:id')
  async bookingsById(@Param() id: number): Promise<BookingResponseType> {
    const response = await this.apiService.bookingsById(id);

    return response;
  }
}
