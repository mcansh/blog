const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const posts = require('./get-posts');

const writeFile = promisify(fs.writeFile);

// Wrap all pages in <urlset> tags
const xmlUrlWrapper = nodes => `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    ${nodes}
  </urlset>
`;

// Determine and return the nodes for every page
const xmlUrlNode = (domain, page) => {
  const loc = `${domain}${page.path}`;
  return `
    <url>
      <loc>${loc}</loc>
      <lastmod>${new Date(page.lastModified)
        .toISOString()
        .slice(0, 10)}</lastmod>
    </url>
  `;
};

const domain = 'https://mcansh.blog';
const fileName = 'sitemap.xml';
const OUT_DIR = path.join(process.cwd(), 'public');

const xml = `${xmlUrlWrapper(
  posts
    .map(page => xmlUrlNode(domain, page))
    .filter(Boolean)
    .join('')
)}`;

module.exports = async () => {
  await writeFile(path.join(OUT_DIR, fileName), xml);
};
