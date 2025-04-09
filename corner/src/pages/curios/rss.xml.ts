import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
        const curios = await getCollection('curios');
        return rss({
                title: "Kenny's Curios",
                description: "A random assortment of things I found interresting at some point. Mostly web-dev.",
                site: new URL("curios", context.site),
                items: curios.map(curio => ({
                        title: curio.data.title,
                        pubDate: curio.data.created,
                        description: curio.data.description,
                        link: new URL(`curios/${curio.id}`, context.site).toString(),
                })),
                trailingSlash: false,
        });
}
