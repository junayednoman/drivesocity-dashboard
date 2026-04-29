import { z } from "zod";

export const createPlanSchema = z.object({
  title: z.string().min(1, "Subscription name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a positive number",
  }),
  // billingCycle: z.enum(["monthly", "yearly"], { message: "Billing cycle is required" }), // Optional
});

export type CreatePlanFormValues = z.infer<typeof createPlanSchema>;