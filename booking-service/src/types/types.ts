export type ReservationType = {
  date: string;
  time: string;
  idTable: number;
  status: 'CREATED' | 'CHECKING_AVAILABILITY' | 'CONFIRMED' | 'REJECTED';
};
