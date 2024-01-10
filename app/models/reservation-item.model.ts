export interface ReservationItemDTO {
  id: string;
  people: number;
  date: string;
  attentionSchedule: AttentionSchedule;
  status: Status;
}

interface AttentionSchedule {
  restaurant: Restaurant;
}

interface Restaurant {
  name: string;
  address: string;
}

interface Status {
  id: number;
}
