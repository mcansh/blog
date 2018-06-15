import { createSitemap } from 'sitemap';
import { homepage } from '../package.json';
import posts from '../posts.json';

const sitemap = createSitemap({
  hostname: homepage,
  cacheTime: 600000, // 600 sec - cache purge period
});

sitemap.add({
  url: '/',
  changefreq: 'daily',
  priority: 1,
});

sitemap.add({
  url: '/changelog',
  changefreq: 'daily',
  priority: 0.3,
});

posts.forEach(post =>
  sitemap.add({
    url: `/${post.id}`,
    changefreq: 'daily',
    priority: 0.9,
  })
);

export default sitemap;
