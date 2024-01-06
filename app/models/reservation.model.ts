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

export interface ReservationForm {
  id: string;
  attentionScheduleId: string;
  dinnerId?: string;
  date: Date;
  people: number;
  message?: string;
  name?: string;
  lastName?: string | null;
  email?: string | null;
  phone?: string | null;
}

export interface CreateReservationDTO {
  dinnerId?: string;
  attentionScheduleId: string;
  date: Date;
  people: number;
  message?: string;
  name?: string;
  lastName?: string | null;
  email?: string | null;
  phone?: string | null;
}

export enum ReservationStatus {
  CREATED = 1,
  ACEPTED = 2,
  REJECTED = 3,
  REPROGRAMED = 4,
}
