import { getRestaurantBySlug } from "@/app/actions/actions";
import { Reservation } from "@/app/components";
import { Restaurant } from "@/app/models/restaurant.model";
import { DatePicker } from "@mui/x-date-pickers";
import React from "react";

export default async function Page({
  params,
}: {
  readonly params: { slug: string };
}) {
  const response = await getRestaurantBySlug({ slug: params.slug });
  const restaurant: Restaurant = await response.json();

  return (
    <div className="w-full min-h-screen bg-blue-chill-200 grid place-content-center">
      <Reservation restaurant={restaurant} />
    </div>
  );
}
