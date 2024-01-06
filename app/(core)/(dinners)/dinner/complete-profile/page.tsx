import { getDinnerBySubIdOrEmail } from "@actions";
import { CompleteProfile } from "@components";
import { getSession } from "@auth0/nextjs-auth0";
import { notFound, redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  readonly searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}) {
  const { user } = (await getSession()) ?? {};

  if (!user) {
    return redirect("/api/auth/login");
  }

  const dinner = await getDinnerBySubIdOrEmail(user.sub, user.email);

  if (!dinner) {
    return notFound();
  }

  return (
    <div>
      <CompleteProfile dinner={dinner} />
    </div>
  );
}
