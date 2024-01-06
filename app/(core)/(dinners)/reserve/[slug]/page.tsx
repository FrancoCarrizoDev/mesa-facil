import {
  checkIncompleteProfile,
  getDinnerBySubIdOrEmail,
  getRestaurantBySlug
} from "@actions";
import { DinnerReservationForm } from "@components";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";
import NotFound from "./not-found";

export default async function Page({
  params,
}: {
  readonly params: { slug: string };
}) {
  const restaurant = await getRestaurantBySlug({ slug: params.slug });

  if (!restaurant) {
    return NotFound();
  }

  const { user } = (await getSession()) ?? {};

  let dinner = null;
  if (user) {
    const incompleteProfile = await checkIncompleteProfile(user);
    if (incompleteProfile) {
      return redirect(
        `/dinner/complete-profile?redirectTo=/reserve/${params.slug}`
      );
    }
    dinner = await getDinnerBySubIdOrEmail(user.sub, user.email);
  }

  return (
    <div className="flex justify-center items-center pt-10">
      <DinnerReservationForm restaurant={restaurant} dinner={dinner} />
    </div>
  );
}
