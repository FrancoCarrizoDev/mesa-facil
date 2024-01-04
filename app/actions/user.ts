"use server";

import prisma from "@/lib/prisma";
import { Claims } from "@auth0/nextjs-auth0";
import { uuid } from "uuidv4";

export async function encureExistsUser(oauthUser: Claims) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: oauthUser.email,
      },
    });

    if (!user) {
      await prisma.user.create({
        data: {
          email: oauthUser.email,
          first_name: oauthUser.given_name,
          last_name: oauthUser.family_name ?? "",
          id: uuid(),
          sub: oauthUser.sub,
        },
      });
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}
