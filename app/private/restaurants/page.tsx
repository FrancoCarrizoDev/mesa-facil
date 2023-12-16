import { RestaurantCard } from "@/app/components";
import { Restaurant } from "@/app/models/restaurant.model";
import { cookies } from "next/headers";
import Link from "next/link";

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

export default async function Page() {
  const restaurants = await getRestaurants();
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg mb-3">Mis Restaurantes</h2>
        <Link
          href="/private/restaurants/create"
          className="bg-blue-chill-400 border border-blue-chill-600 py-2 px-2 text-white rounded-md text-sm"
        >
          Crear Restaurante
        </Link>
      </div>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
        {restaurants?.map((restaurant) => {
          return (
            <li key={restaurant.id} className="h-full">
              <RestaurantCard {...restaurant} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
