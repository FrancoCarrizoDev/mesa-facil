"use server";

import { z } from "zod";

export async function createRestaurantAction(
  prevValues: any,
  formData: FormData
) {
  console.log({ prevValues });
  const rawFormData = {
    name: formData.get("name"),
    address: formData.get("address"),
    phone: formData.get("phone"),
  };

  //   const schema = z.object({
  //     id: z.string().optional(),
  //     name: z.string().min(3).max(50),
  //     address: z.string().min(3).max(50),
  //     phone: z.string().min(3).max(50),
  //     // attentionSchedule: z
  //     //   .object({
  //     //     openingTime: z.string().min(3).max(50),
  //     //     closingTime: z.string().min(3).max(50),
  //     //     id: z.string().optional(),
  //     //     restaurantId: z.string().optional(),
  //     //     weekDay: z.string().min(3).max(50),
  //     //   })
  //     //   .optional(),
  //   });

  //   const parse = schema.safeParse(formData);

  //   if (!parse.success) {
  //     return {
  //       status: 400,
  //       body: parse.error,
  //     };
  //   }

  //   console.log({ data: parse.data });

  //   const { ...rest } = parse.data;
  console.log(rawFormData);
  return { message: `Added todo` };
}
