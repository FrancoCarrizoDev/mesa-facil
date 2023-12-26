"use server";

import prisma from "@/lib/prisma";
import { Claims } from "@auth0/nextjs-auth0";
import { Dinner } from "@prisma/client";

export async function checkIncompleteProfile(
  oauthUser: Claims
): Promise<boolean> {
  try {
    const dinner = await prisma.dinner.findUnique({
      where: {
        id: oauthUser.sub,
      },
    });

    if (!dinner) {
      await prisma.dinner.create({
        data: {
          id: oauthUser.sub,
          first_name: oauthUser.given_name || oauthUser.nickname,
          email: oauthUser.email,
        },
      });
      return true;
    }

    if (!dinner.first_name || !dinner.last_name || !dinner.email) {
      return true;
    }

    return false;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function getDinnerById(id: string): Promise<Dinner | null> {
  try {
    const dinner = await prisma.dinner.findUnique({
      where: {
        id,
      },
    });

    return dinner;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}

export async function updateDinnerById(
  id: string,
  data: Partial<Dinner>
): Promise<Dinner | null> {
  try {
    const dinner = await prisma.dinner.update({
      where: {
        id,
      },
      data: {
        last_name: data.last_name,
        birthday: data.birthday,
        phone: data.phone,
      },
    });

    return dinner;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}
