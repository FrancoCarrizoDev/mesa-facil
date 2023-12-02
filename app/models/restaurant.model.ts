import { AttentionSchedule } from "./attention-schedule.model";

export interface Restaurant {
  id: string;
  name: string;
  phone: string;
  address: string;
  attentionSchedule: AttentionSchedule[];
}
