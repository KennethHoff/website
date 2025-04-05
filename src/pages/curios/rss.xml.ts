import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
    const curios = await getCollection('curios');
    return rss({
        title: "Kenny's Corner",
        description: "Kenny's Corner's Curios",
        site: context.site!,
        items: curios.map(curio => ({
            title: curio.data.title,
            pubDate: curio.data.created,
            description: curio.data.description,
        }))
    });
}
