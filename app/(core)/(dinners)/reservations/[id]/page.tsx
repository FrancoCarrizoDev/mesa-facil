import { getReservationById } from "@/app/actions/reservation";
import { ReservationDetail } from "@/app/components";
import { notFound } from "next/navigation";
import React from "react";

export default async function Page({
  params,
}: {
  readonly params: { id: string };
}) {
  const reservation = await getReservationById(params.id);

  if (!reservation) return notFound();

  console.log({ reservation: JSON.stringify(reservation) });

  return (
    <div className="w-full max-w-sm mx-auto mt-5 bg-white border border-gray-200 rounded-lg shadow">
      <ReservationDetail reservation={reservation} />
    </div>
  );
}
