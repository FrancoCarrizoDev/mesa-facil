export interface AttentionSchedule {
  id?: string;
  day: string;
  start: string;
  dayNumber: number;
  end: string;
  restaurantId?: string | null;
}

export interface AttentionScheduleDTO {
  start: string;
  open: string;
  weekDayId: number;
}
