import { z } from "zod";

export const weatherDataSchema = z.object({
  city: z.string(),
  country: z.string(),
  temperature: z.number(),
  feelsLike: z.number(),
  description: z.string(),
  icon: z.string(),
  humidity: z.number(),
  windSpeed: z.number(),
  pressure: z.number(),
  visibility: z.number().optional(),
  timestamp: z.number(),
});

export const favoriteLocationSchema = z.object({
  id: z.string(),
  city: z.string(),
  country: z.string(),
  addedAt: z.number(),
});

export const insertFavoriteLocationSchema = favoriteLocationSchema.omit({
  id: true,
  addedAt: true,
});
