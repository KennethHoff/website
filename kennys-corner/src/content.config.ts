import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const newsletter = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/newsletter" }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = { newsletter };
