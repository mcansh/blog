/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const posts = require('../get-blog-posts');

// Wrap all pages in <urlset> tags
const xmlUrlWrapper = nodes => `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    ${nodes}
  </urlset>
`;

// Determine and return the nodes for every page
const xmlUrlNode = (domain, page) => {
  const loc = `${domain}${page.url}`;
  return `
    <url>
      <loc>${loc}</loc>
      <lastmod>${page.lastmod}</lastmod>
      <changefreq>hourly</changefreq>
    </url>
  `;
};

const domain = 'https://mcansh.blog';
const fileName = 'sitemap.xml';
const OUT_DIR = path.join(__dirname, '..', '..', 'public');

const xml = `${xmlUrlWrapper(
  posts
    .map(page => xmlUrlNode(domain, page))
    .filter(Boolean)
    .join('')
)}`;

module.exports = () => {
  fs.writeFileSync(path.join(OUT_DIR, fileName), xml);
};
