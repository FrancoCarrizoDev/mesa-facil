export interface DinnerReservation {
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

export interface Dinner {
  id: string;
  first_name: string;
  last_name: string | null;
  phone: string | null;
  email: string | null;
  birthday: string | null;
}

export interface Status {
  id: number;
  status: string;
}

export interface Restaurant {
  id: string;
  name: string;
  phone: string;
  address: string;
  userId: string;
  slug: string | null;
}
