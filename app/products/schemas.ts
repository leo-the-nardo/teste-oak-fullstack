import { z } from "zod"

export const ProductSchema = z.object({
  price: z.number().min(0.01),
  name: z.string().min(3),
  available: z.enum(["yes", "no"]),
  description: z.string().optional(),
})
