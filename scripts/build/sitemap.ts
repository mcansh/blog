// Native
import * as fs from 'fs';
import { join } from 'path';
import { promisify } from 'util';

// Packages
import { createSitemap } from 'sitemap';
import { homepage } from '../../package.json';
import posts from '../../posts';
import { Post } from '../../components/PostCard';

const writeFile = promisify(fs.writeFile);
const stat = promisify(fs.stat);

const generateSiteMap = async () => {
  const urls = await Promise.all(
    posts.map(async (post: Post) => {
      const filePath = join(__dirname, '..', '..', 'pages', `${post.url}.mdx`);

      const { mtime } = await stat(filePath);

      return {
        url: post.url,
        changefreq: 'daily',
        priority: 0.9,
        lastmodISO: new Date(mtime).toISOString(),
      };
    })
  );

  return createSitemap({
    hostname: homepage,
    cacheTime: 600000, // 600 sec (10 min) cache purge period
    urls: [
      {
        url: '/',
        changefreq: 'daily',
        priority: 1,
      },
      ...urls,
    ],
  }).toXML();
};

const sitemap = async () => {
  const xml = await generateSiteMap();
  const path = join(__dirname, '..', '..', 'static/sitemap.xml');
  await writeFile(path, xml);
};

export default sitemap;
