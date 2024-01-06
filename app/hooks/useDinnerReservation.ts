import { useState } from "react";
import { WEEK_DAYS } from "@constants";
import { Restaurant } from "@models";
import { setMinutes, setHours, addDays } from "date-fns";

export default function useDinnerReservation({
  restaurant,
}: {
  readonly restaurant: Restaurant;
}) {
  const [dinnerDate, setDinnerDate] = useState<Date | null>(null);

  const closedDays = WEEK_DAYS.filter(
    (day) =>
      !restaurant.attentionSchedule.some(
        (schedule) => schedule.dayNumber === day.id
      )
  );
  const hashClosedDays = closedDays.reduce((acc, day) => {
    acc[day.id] = true;
    return acc;
  }, {} as Record<number, boolean>);

  const filterTimes = (time: Date) => {
    const day = time.getDay();
    const foundByDayId = restaurant.attentionSchedule.find(
      (schedule) => schedule.dayNumber === day
    );

    if (!foundByDayId) return false;

    const [startRangeHours, startRangeMinutes] = foundByDayId.start.split(":");
    const [endRangeHours, endRangeMinutes] = foundByDayId.end.split(":");

    const hours = time.getHours();
    const minutes = time.getMinutes();
    return (
      setHours(setMinutes(new Date(), minutes), hours) >=
        setHours(
          setMinutes(new Date(), +startRangeMinutes),
          +startRangeHours
        ) &&
      setHours(setMinutes(new Date(), minutes), hours) <=
        setHours(setMinutes(new Date(), +endRangeMinutes), +endRangeHours)
    );
  };

  const minDate = new Date();
  const maxDate = addDays(new Date(), 30);

  return {
    dinnerDate,
    setDinnerDate,
    filterTimes,
    hashClosedDays,
    restaurant,
    minDate,
    maxDate,
  };
}
