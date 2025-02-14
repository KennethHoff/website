// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

import react from '@astrojs/react';

console.log({ VERCEL_URL: process.env.VERCEL_URL })
console.log({ env: process.env })

export default defineConfig({
        site: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:4321',
        vite: {
                plugins: [tailwindcss()]
        },
        integrations: [sitemap(), react()],
        adapter: vercel(),
});
