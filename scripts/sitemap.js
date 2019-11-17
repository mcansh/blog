/* eslint-disable no-console */
// This is a development script executed in the build step of pages
const fs = require('fs');
const path = require('path');

const prettier = require('prettier');

const DOMAIN = 'https://mcansh.blog';
const META = /export\s+const\s+meta\s+=\s+({[\s\S]*?\n})/;
const SITEMAP_PATH = 'public/sitemap.xml';
const POSTS_PATH = 'data/posts.json';

// Set the header
const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;

// Wrap all pages in <urlset> tags
const xmlUrlWrapper = nodes => `${xmlHeader}
${nodes}
</urlset>`;

function recursiveReadDirSync(dir, arr = [], rootDir = dir) {
  const result = fs.readdirSync(dir);

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

function xmlUrlNode(pagePath) {
  const page = path.basename(pagePath);
  const pageName = path.basename(pagePath, path.extname(page));
  const relativeUrl = pagePath.replace(
    page,
    pageName === 'index' ? '' : `${pageName}/`
  );
  const content = fs.readFileSync(path.join('pages', pagePath), 'utf-8');
  const match = content.match(META);
  const loc = DOMAIN + relativeUrl;

  let meta;
  let lastmod;

  if (match && typeof match[1] === 'string') {
    // eslint-disable-next-line no-eval
    meta = eval(`(${match[1]})`);

    if (meta.lastEdited) {
      lastmod = meta.lastEdited;
    }
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
  const posts = recursiveReadDirSync('pages', [], 'pages');
  const postsMeta = [];

  const nodes = posts
    .reduce((carry, filePath) => {
      const pagePath = filePath.replace(/\\/g, '/');

      // Only v2 pages are included in sitemap.xml
      if (!pagePath.startsWith('.')) {
        const { node } = xmlUrlNode(pagePath);
        carry.push(node);
      }
      return carry;
    }, [])
    .concat(
      posts.map(filePath => {
        const pagePath = filePath.replace(/\\/g, '/');
        const { node, meta } = xmlUrlNode(pagePath);

        if (meta) {
          postsMeta.push({ ...meta, path: pagePath.replace(/\.mdx$/, '') });
        }

        return node;
      })
    );

  const sitemap = `${xmlUrlWrapper(nodes.join('\n'))}`;

  fs.writeFileSync(SITEMAP_PATH, sitemap);

  console.log(
    `sitemap.xml with ${nodes.length} entries was written to ${SITEMAP_PATH}`
  );

  const sortedPosts = postsMeta.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const postsJson = JSON.stringify(sortedPosts, null, 2);

  fs.writeFileSync(POSTS_PATH, prettier.format(postsJson, { parser: 'json' }));

  console.log(
    `posts.json with ${postsMeta.length} entries was written to ${POSTS_PATH}`
  );
}

generateSiteMap();
