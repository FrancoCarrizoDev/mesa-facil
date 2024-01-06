import { CreateEditRestaurantForm, SectionTitle } from "@components";
import { getRestaurantById } from "@actions";
import React from "react";

export default async function Page({
  params,
}: {
  readonly params: { id: string };
}) {
  const response = await getRestaurantById({ id: params.id });
  const restaurant = await response.json();

  return (
    <section className="w-full border rounded-md p-5 bg-blue-chill-100 border-blue-chill-400">
      <SectionTitle title="Editar Restaurante" />
      <CreateEditRestaurantForm restaurant={restaurant} />
    </section>
  );
}
