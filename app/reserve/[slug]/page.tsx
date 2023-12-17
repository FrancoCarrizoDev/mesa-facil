import { getRestaurantBySlug } from "@/app/actions/restaurants";
import { Reservation } from "@/app/components";
import { Restaurant } from "@/app/models/restaurant.model";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  readonly params: { slug: string };
}) {
  const response = await getRestaurantBySlug({ slug: params.slug });
  const restaurant: Restaurant = await response.json();

  return (
    <div className="w-full min-h-screen  bg-blue-chill-50 ">
      <div className="flex justify-center items-center pt-10">
        <Suspense>
          <Reservation restaurant={restaurant} />
        </Suspense>
      </div>
    </div>
  );
}
