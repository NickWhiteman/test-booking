import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'booking' })
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  time: string;

  @Column()
  id_table: number;

  @Column()
  status: 'CREATED' | 'CHECKING_AVAILABILITY' | 'REJECTED' | 'CONFIRMED';
}
