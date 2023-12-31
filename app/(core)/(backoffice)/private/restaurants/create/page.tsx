import { SectionTitle, CreateEditRestaurantForm } from "@/app/components";
import React from "react";

export default async function Page() {
  return (
    <section className="w-full border rounded-md p-5 bg-lemon-100 border-lemon-400">
      <SectionTitle title="Crear Restaurante" />
      <CreateEditRestaurantForm />
    </section>
  );
}
