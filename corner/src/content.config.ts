import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import type { Thing, WithContext } from "schema-dts";

/**
 * Noop function for improved type-safety
 **/
function defineStructuredData<T extends Thing>(
    thing: WithContext<T>,
): WithContext<T> {
    return thing;
}

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
