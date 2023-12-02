import { SectionTitle, CreateEditRestaurantForm } from "@/app/components";
import React from "react";

export default function Page() {
  return (
    <section className="w-full border rounded-md p-5 bg-blue-chill-100 border-blue-chill-400">
      <SectionTitle title="Crear Restaurante" />
      <CreateEditRestaurantForm />
    </section>
  );
}
