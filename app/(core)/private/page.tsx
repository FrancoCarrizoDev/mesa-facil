import Link from "next/link";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";
import { Restaurant } from "@prisma/client";
import { encureExistsUser } from "@/app/actions/user";
import { getRestaurantsByUser } from "@/app/actions/restaurants";

export default async function Private() {
  const { user } = (await getSession()) ?? {};

  if (!user) {
    return redirect("/");
  }
  await encureExistsUser(user);
  const restaurants = (await getRestaurantsByUser()) as Restaurant[];
  console.log(restaurants);
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
