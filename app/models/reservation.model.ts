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
  CREATED = 1,
  ACEPTED = 2,
  REJECTED = 3,
  REPROGRAMED = 4,
}
