"use client";
import { useEffect, useState } from "react";
import { Button, Select, TextField } from "..";
import { WEEK_DAYS } from "@constants";
import { AttentionSchedule } from "@models";

type Props = {
  readonly onChange: (e: AttentionSchedule | AttentionSchedule[]) => void;
  readonly initialAttentionSchedule?: AttentionSchedule;
};

export default function CreateAtentionSchedules({
  onChange,
  initialAttentionSchedule,
}: Props) {
  const [weekDayId, setWeekDayId] = useState<number>(1);
  const [openingTime, setOpeningTime] = useState<string>("00:00");
  const [closingTime, setClosingTime] = useState<string>("23:59");
  const [repeatForOtherDays, setRepeatForOtherDays] = useState<boolean>(false);

  useEffect(() => {
    if (!initialAttentionSchedule) return;

    setWeekDayId(
      WEEK_DAYS.find((day) => day.weekDay === initialAttentionSchedule.day)!.id
    );
    setOpeningTime(initialAttentionSchedule.start);
    setClosingTime(initialAttentionSchedule.end);
  }, [initialAttentionSchedule]);

  const handleAddAttentionSchedule = () => {
    if (repeatForOtherDays) {
      const mapDays = WEEK_DAYS.map((day) => ({
        day: day.weekDay,
        start: openingTime,
        end: closingTime,
        dayNumber: day.id,
      }));

      onChange(mapDays);
      setRepeatForOtherDays(false);
      return;
    }

    const attentionSchedule: AttentionSchedule = {
      day: WEEK_DAYS.find((day) => day.id === weekDayId)!.weekDay,
      start: openingTime,
      end: closingTime,
      dayNumber: weekDayId,
    };

    onChange(attentionSchedule);
  };

  return (
    <>
      <Select
        value={weekDayId}
        label="Horarios de reserva"
        options={WEEK_DAYS.map((day) => ({
          value: day.id,
          label: day.weekDay,
        }))}
        onChange={(e) => {
          setWeekDayId(Number(e.target.value));
        }}
      />

      <div className="flex items-baseline gap-2">
        <TextField
          label="Desde"
          type="time"
          value={openingTime}
          onChange={(e) => {
            setOpeningTime(e.target.value);
          }}
          required
        />
        <TextField
          label="Hasta"
          type="time"
          value={closingTime}
          onChange={(e) => {
            setClosingTime(e.target.value);
          }}
        />
        <div className="flex items-center mt-auto pb-2">
          <input
            id="default-checkbox"
            type="checkbox"
            checked={repeatForOtherDays}
            onChange={(e) => {
              setRepeatForOtherDays(e.target.checked);
            }}
            className="w-4 h-4 text-blue-chill-900 border-gray-300 rounded focus:ring-blue-500  "
          />
          <label
            htmlFor="default-checkbox"
            className="ms-2 text-sm font-sm text-gray-950"
          >
            Repetir para todos los días
          </label>
        </div>
      </div>
      <div className="mt-auto flex">
        <Button
          type="button"
          onClick={handleAddAttentionSchedule}
          text="AGREGAR"
          fullWidth="true"
        />
      </div>
    </>
  );
}
