export interface ReservationByIdDTO {
  id: string;
  date: string;
  people: string;
  attentionSchedule: {
    restaurant: {
      name: string;
      address: string;
    };
  };
}

export enum ReservationStatus {
  PENDING = 1,
  CONFIRMED = 2,
  COMPLETED = 3,
  CANCELED = 4,
}
