import { getRestaurantById } from "@/app/actions/actions";
import { RestaurantCard } from "@/app/components";
import React from "react";

export default async function Page({
  params,
}: {
  readonly params: { id: string };
}) {
  const response = await getRestaurantById({ id: params.id });
  const restaurant = await response.json();
  console.log({ restaurant });

  return (
    <div>
      <RestaurantCard {...restaurant} />
    </div>
  );
}
