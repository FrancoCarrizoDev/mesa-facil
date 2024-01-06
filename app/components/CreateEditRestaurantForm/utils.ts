import { AttentionSchedule } from "@models";

export const checkIfClosingTimeIsBeforeOpeningTime = (
  attentionSchedule: AttentionSchedule
) => {
  const [openingTimeHour, openingTimeMinutes] =
    attentionSchedule.start.split(":");
  const [closingTimeHour, closeTimeMinutes] = attentionSchedule.end.split(":");

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
