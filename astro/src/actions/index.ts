import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { sleep } from "@/functions";

export const server = {
    greet: defineAction({
        input: z.object({
            name: z.string(),
        }),
        handler: async (input) => {
            await sleep(250);
            return `Hello, ${input.name}`;
        },
    }),
};
