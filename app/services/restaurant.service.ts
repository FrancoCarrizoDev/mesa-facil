import { Restaurant } from "../models/restaurant.model";

export async function createRestaurant(restaurant: Restaurant) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH0_BASE_URL}/api/restaurant`,
    {
      method: "POST",
      body: JSON.stringify(restaurant),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.json();
}
