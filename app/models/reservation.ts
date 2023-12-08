export interface Reservation {
  id: string;
  attentionScheduleId: string;
  dinnerId: string | null;
  date: string;
  people: string;
  message: string;
  code: string;
  statusId: string;
}

export enum ReservationStatus {
  PENDING = 1,
  CONFIRMED = 2,
  COMPLETED = 3,
  CANCELED = 4,
}
