export interface DinnerReservation {
  readonly id: string;
  readonly attentionScheduleId: string;
  readonly dinnerId: string | null;
  readonly date: string;
  readonly people: string;
  readonly message: string;
  readonly code: string;
  readonly statusId: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly dinner: Dinner | null;
  readonly attentionSchedule: AttentionSchedule;
  readonly status: Status;
}

export interface AttentionSchedule {
  readonly id: string;
  readonly restaurantId: string;
  readonly day: string;
  readonly dayNumber: number;
  readonly start: string;
  readonly end: string;
  readonly restaurant: Restaurant;
}

export interface Dinner {
  readonly id: string;
  readonly first_name: string;
  readonly last_name: string | null;
  readonly phone: string | null;
  readonly email: string | null;
  readonly birthday: string | null;
}

export interface Status {
  readonly id: number;
  readonly status: string;
}

export interface Restaurant {
  readonly id: string;
  readonly name: string;
  readonly phone: string;
  readonly address: string;
  readonly userId: string;
  readonly slug: string | null;
}

export enum ReservationStatus {
  CREATED = 1,
  CONFIRMED = 2,
  REJECTED = 3,
  REPROGRAMMED = 4,
}
