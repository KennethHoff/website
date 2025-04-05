// @ts-check

import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const siteUrl =
        // If Production, use production URL
        process.env.VERCEL_ENV == "production"
                ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
                : // Otherwise, if you have a VERCEL_URL, use it
                process.env.VERCEL_URL
                        ? `https://${process.env.VERCEL_URL}`
                        : // Otherwise, just use localhost.
                        "http://localhost:4321";

export default defineConfig({
        site: siteUrl,
        vite: {
                plugins: [tailwindcss()],
        },
        integrations: [sitemap()],
        adapter: vercel(),
        trailingSlash: "never",
});
