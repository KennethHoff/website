import { getCollection } from "astro:content";
import rss from "@astrojs/rss";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
    const articles = await getCollection("articles");
    const sortedArticles = articles.toSorted(
        (a, b) => b.data.created.getTime() - a.data.created.getTime(),
    );
    return rss({
        title: "Kenny's Corner",
        description:
            "A random assortment of things I found interresting at some point. Mostly web-dev.",
        site: new URL(context.site!),
        items: sortedArticles.map((article) => ({
            title: article.data.title,
            pubDate: article.data.created,
            description: article.data.description,
            link: new URL(article.id, context.site).toString(),
        })),
        trailingSlash: false,
    });
}
