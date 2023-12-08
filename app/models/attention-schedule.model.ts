export interface AttentionSchedule {
  id?: string;
  day: string;
  start: string;
  end: string;
  restaurantId?: string | null;
}

export interface AttentionScheduleDTO {
  start: string;
  open: string;
  weekDayId: number;
}
