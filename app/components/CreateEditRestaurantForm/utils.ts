import { AttentionSchedule } from "@/app/models/attention-schedule.model";

export const checkIfClosingTimeIsBeforeOpeningTime = (
  attentionSchedule: AttentionSchedule
) => {
  debugger;
  const [openingTimeHour, openingTimeMinutes] =
    attentionSchedule.openingTime.split(":");
  const [closingTimeHour, closeTimeMinutes] =
    attentionSchedule.closingTime.split(":");

  if (parseInt(openingTimeHour) > parseInt(closingTimeHour)) {
    return true;
  }

  if (
    parseInt(openingTimeHour) === parseInt(closingTimeHour) &&
    parseInt(openingTimeMinutes) > parseInt(closeTimeMinutes)
  ) {
    return true;
  }

  return false;
};
