import { getRestaurants } from "@/app/services/restaurant.service";
import { cookies } from "next/headers";
import { Suspense } from "react";

export default async function Page() {
  const restaurants = await getRestaurants();
  console.log({ restaurants });
  return (
    <div>
      <h2 className="font-medium text-lg">Restaurants</h2>
      {/* <ul>
        {restaurants.map((restaurant) => {
          return <li key={restaurant.id}>{restaurant.name}</li>;
        })}
      </ul> */}
    </div>
  );
}
