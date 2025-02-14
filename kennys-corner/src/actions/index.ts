import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const server = {
        greet: defineAction({
                input: z.object({
                        name: z.string()
                }),
                handler: async (input, context) => {
                        return `Hello, ${input.name}`;
                },
        })
};
