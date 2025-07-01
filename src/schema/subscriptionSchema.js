"use client";

import * as z from "zod";

export const createSubscriptionSchema = z.object({
  title: z.string({ required_error: "Title is required" }).min(1),
  shortDescription: z
    .string({ required_error: "Short description is required" })
    .min(1),
  price: z.preprocess(
    (val) => Number(val),
    z
      .number({ required_error: "Price is required" })
      .min(0.01, "Price must be greater than 0"),
  ),
  billingCycle: z
    .string({ required_error: "Billing cycle is required" })
    .refine((val) => ["monthly", "yearly"].includes(val), {
      message: "Invalid billing cycle",
    }),
  features: z
    .array(z.string().min(1))
    .min(1, { message: "At least one feature is required" }),
});
