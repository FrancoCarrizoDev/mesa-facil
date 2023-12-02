export interface AttentionSchedule {
  id?: string;
  weekDay: string;
  openingTime: string;
  closingTime: string;
  restaurantId?: string | null;
}

export interface AttentionScheduleDTO {
  openingTime: string;
  closingTime: string;
  weekDayId: number;
}
