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

export async function getRestaurants(): Promise<Restaurant[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH0_BASE_URL}/api/restaurant`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}