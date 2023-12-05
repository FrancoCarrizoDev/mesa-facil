export interface AttentionSchedule {
  id?: string;
  day: string;
  start: string;
  end: string;
  restaurantId?: string | null;
}

export interface AttentionScheduleDTO {
  openingTime: string;
  closingTime: string;
  weekDayId: number;
}
