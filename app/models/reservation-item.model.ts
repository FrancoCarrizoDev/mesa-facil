export interface ReservationItemDTO {
  id: string;
  people: string;
  date: string;
  attentionSchedule: AttentionSchedule;
  status: Status;
}

export interface AttentionSchedule {
  restaurant: Restaurant;
}

export interface Restaurant {
  name: string;
}

export interface Status {
  status: string;
}
export enum ReservationStatus {
  CREATED = 1,
  CONFIRMED = 2,
  REJECTED = 3,
  REPROGRAMMED = 4,
}
