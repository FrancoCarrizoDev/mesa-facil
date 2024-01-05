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
  id: number;
}
