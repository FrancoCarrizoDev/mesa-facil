import { getRestaurantsByUserId } from "@/app/actions/restaurants";
import { RestaurantCard } from "@/app/components";
import { getSession } from "@auth0/nextjs-auth0";
import Link from "next/link";

export default async function Page() {
  const { user } = (await getSession()) ?? {};
  const restaurants = await getRestaurantsByUserId(user?.id);
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
              <RestaurantCard
                address={restaurant.address}
                attentionSchedule={restaurant.attentionSchedule}
                id={restaurant.id}
                name={restaurant.name}
                phone={restaurant.phone}
                slug={restaurant.slug ?? ""}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
