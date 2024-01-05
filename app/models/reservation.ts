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

export interface ReservationByID {
  id: string;
  attentionScheduleId: string;
  dinnerId: string | null;
  date: string;
  people: string;
  message: string;
  code: string;
  statusId: number;
  createdAt: Date;
  updatedAt: Date;
  dinner: Dinner | null;
  attentionSchedule: AttentionSchedule;
  status: Status;
}

export interface AttentionSchedule {
  id: string;
  restaurantId: string;
  day: string;
  dayNumber: number;
  start: string;
  end: string;
  restaurant: Restaurant;
}

export interface Restaurant {
  id: string;
  name: string;
  phone: string;
  address: string;
  userId: string;
  slug: string | null;
}

export interface Dinner {
  id: string;
  sub: string | null;
  first_name: string;
  last_name: string | null;
  phone: string | null;
  email: string;
  birthday: string | null;
}

export interface Status {
  id: number;
  status: string;
}

export enum ReservationStatus {
  PENDING = 1,
  CONFIRMED = 2,
  COMPLETED = 3,
  CANCELED = 4,
}
