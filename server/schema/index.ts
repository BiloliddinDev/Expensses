import { z } from "zod";

export const createExpenseSchema = z.object({
  title: z.string().min(3).max(100),
  icon: z.string().max(3),
  amount: z.number().int().positive(),
  description: z.string(),
});
