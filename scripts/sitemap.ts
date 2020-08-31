/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';

import { Post } from '~/components/post-card';

const DOMAIN = 'https://mcansh.blog';
const SITEMAP_PATH = 'public/sitemap.xml';

// Set the header
const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;

// Wrap all pages in <urlset> tags
const xmlUrlWrapper = (nodes: string) => `${xmlHeader}
${nodes}
</urlset>`;

function recursiveReadDirSync(
  dir: string,
  arr: any[] = [],
  rootDir = dir
): string[] {
  const result = fs.readdirSync(dir).filter(file => !file.startsWith('_'));

  result.forEach(part => {
    const absolutePath = path.join(dir, part);
    const pathStat = fs.statSync(absolutePath);

    if (pathStat.isDirectory()) {
      recursiveReadDirSync(absolutePath, arr, rootDir);
      return;
    }
    arr.push(absolutePath.replace(rootDir, ''));
  });

  return arr;
}

function xmlUrlNode(pagePath: string) {
  const page = path.basename(pagePath);
  const pageName = path.basename(pagePath, path.extname(page));
  const relativeUrl = pagePath.replace(
    page,
    pageName === 'index' ? '' : `${pageName}/`
  );
  const content = fs.readFileSync(path.join('pages', pagePath), 'utf-8');
  const frontMatter = matter(content);
  const loc = DOMAIN + relativeUrl;

  let lastmod;
  let meta;

  if (frontMatter?.data) {
    meta = frontMatter.data as Post;
  }

  if (frontMatter?.data?.lastEdited) {
    lastmod = frontMatter.data.lastEdited;
  }

  const node = `  <url>
    <loc>${loc}</loc>${
    lastmod !== undefined
      ? `
    <lastmod>${lastmod}</lastmod>`
      : ``
  }
    <changefreq>hourly</changefreq>
  </url>`;

  return { node, meta };
}

function generateSiteMap() {
  const posts: string[] = recursiveReadDirSync('pages');

  const postsMeta: Post[] = [];

  const nodes = posts
    .reduce((acc: string[], filePath) => {
      const pagePath = filePath.replace(/\\/g, '/');
      if (!pagePath.startsWith('.')) {
        const { node } = xmlUrlNode(pagePath);
        return [...acc, node];
      }
      return acc;
    }, [])
    .concat(
      posts.map(filePath => {
        const pagePath = filePath.replace(/\\/g, '/');
        const { node, meta } = xmlUrlNode(pagePath);

        if (meta) {
          postsMeta.push({ ...meta, filePath: pagePath.replace(/\.mdx$/, '') });
        }

        return node;
      })
    );

  const sitemap = `${xmlUrlWrapper(nodes.join('\n'))}`;

  fs.writeFileSync(SITEMAP_PATH, sitemap);

  console.log(
    `sitemap.xml with ${nodes.length} entries was written to ${SITEMAP_PATH}`
  );
}

generateSiteMap();
