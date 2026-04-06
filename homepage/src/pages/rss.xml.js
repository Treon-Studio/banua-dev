import rss, { pagesGlobToRssItems } from '@astrojs/rss';
export async function GET(context) {
  return rss({
     title: 'BanuaDev',
    description: 'Komunitas developer Kalimantan Selatan. Belajar bersama, berbagi pengalaman, dan berkembang bersama dalam dunia teknologi di Bumi Banua.',
    site: context.site,
    items: await pagesGlobToRssItems(
      import.meta.glob('./blog/*.{md,mdx}'),
    ),
  });
}