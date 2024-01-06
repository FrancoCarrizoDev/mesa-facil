export interface ReservationItemDTO {
  id: string;
  people: string;
  date: string;
  attentionSchedule: AttentionSchedule;
  status: Status;
}

interface AttentionSchedule {
  restaurant: Restaurant;
}

interface Restaurant {
  name: string;
}

interface Status {
  id: number;
}
