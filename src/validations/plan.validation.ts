import * as z from "zod";

export const createPlanSchema = z.object({
  title: z.string().min(1, "Plan name is required"),
  description: z.string().min(1, "Short description is required"),
  price: z
    .string({ required_error: "Price is required" })
    .min(1, "Price is required"),
});

export type CreatePlanFormValues = z.infer<typeof createPlanSchema>;