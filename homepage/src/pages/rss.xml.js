import rss, { pagesGlobToRssItems } from '@astrojs/rss';
export async function GET(context) {
  return rss({
     title: 'BanuaDev',
    description: 'BanuaDev - Software development and technology solutions.',
    site: context.site,
    items: await pagesGlobToRssItems(
      import.meta.glob('./blog/*.{md,mdx}'),
    ),
  });
}