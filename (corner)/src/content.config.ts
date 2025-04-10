import { defineCollection, z } from "astro:content";
import { defineStructuredData } from "@lib/utils";
import { glob } from "astro/loaders";

const articles = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
    schema: z
        .object({
            title: z.string(),
            author: z.string(),
            description: z.string().optional(),
            created: z.coerce.date(),
            modified: z.coerce.date().optional(),
        })
        .transform((data) => ({
            ...data,
            structuredData: defineStructuredData({
                "@context": "https://schema.org",
                "@type": "TechArticle",
                datePublished: data.created.toUTCString(),
                ...(data.modified && {
                    dateModified: data.modified.toUTCString(),
                }),
            }),
        })),
});

export const collections = { articles };
