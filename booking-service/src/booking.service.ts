import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entitys/Booking';
import { ReservationType } from './types/types';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,
  ) {}

  async createReservation(reservation: ReservationType): Promise<number> {
    const booking = this.bookingRepo.create({
      date: new Date(reservation.date),
      time: reservation.time,
      id_table: reservation.idTable,
      status: reservation.status,
    });
    const { id } = await this.bookingRepo.save(booking);
    await this.bookingRepo.query(
      `UPDATE booking SET status = 'CHECKING_AVAILABILITY' WHERE id = ${id}`,
    );
    const existing = await this.bookingRepo.query(
      `SELECT * FROM booking 
        WHERE id_table = ${reservation.idTable} 
          AND DATE(date) = DATE('${reservation.date}')
          AND time = '${reservation.time}' 
          AND status = 'CONFIRMED'
          AND id != ${id}`,
    );
    if (existing.length > 0) {
      await this.bookingRepo.query(
        `UPDATE booking SET status = 'REJECTED' WHERE id = ${id}`,
      );
    } else {
      await this.bookingRepo.query(
        `UPDATE booking SET status = 'CONFIRMED' WHERE id = ${id}`,
      );
    }

    return id;
  }

  async getById(id: number): Promise<Booking> {
    const booking = await this.bookingRepo.query(
      `SELECT * FROM booking WHERE id = ${id}`,
    );
    return booking[0];
  }
}
