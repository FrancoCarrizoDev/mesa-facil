import { Restaurant } from "@prisma/client";
import Link from "next/link";
import { cookies } from "next/headers";

export async function getRestaurants(): Promise<Restaurant[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH0_BASE_URL}/api/restaurant`,
    {
      cache: "no-store",
      headers: {
        cookie: `appSession=${cookies().get("appSession")?.value}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

export default async function Private() {
  const restaurants = await getRestaurants();

  return (
    <section className="w-full border rounded-md p-5 bg-blue-chill-100 border-blue-chill-400">
      <h1 className="text-4xl font-bold text-blue-chill-950">Bienvenido!</h1>
      <div className="flex items-center gap-5 mt-5 text-blue-chill-900">
        <div className="p-5 bg-blue-chill-200 rounded-md">
          {restaurants.length === 0 && (
            <p>
              No tienes restaurantes cargandos.{" "}
              <Link
                className="font-semibold text-blue-chill-950 
              hover:underline hover:underline-offset-1 "
                href={"/private/restaurants/create"}
              >
                Créalo aquí
              </Link>
            </p>
          )}
          {restaurants.map((restaurant) => (
            <p key={restaurant.id}>{restaurant.name}</p>
          ))}
        </div>
        <div className="p-5 bg-blue-chill-200 rounded-md">
          <p>No tienes reservas para el día de hoy...</p>
        </div>
        <div className="p-5 bg-blue-chill-200 rounded-md">
          <p>No tienes reseñas aún ...</p>
        </div>
      </div>
    </section>
  );
}
