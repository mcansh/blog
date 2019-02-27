import { promisify } from 'util';
import * as fs from 'fs';
import * as glob from 'glob';
import * as path from 'path';

const writeFile = promisify(fs.writeFile);

// Wrap all pages in <urlset> tags
const xmlUrlWrapper = nodes => `
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    ${nodes}
  </urlset>
`;

// Determine and return the nodes for every page
const xmlUrlNode = (
  domain: string,
  page: { name: string; lastmod: string }
) => {
  const loc = `${domain}/${page.name === 'index' ? '' : page.name}`;

  return `
    <url>
      <loc>${loc}</loc>
      <lastmod>${page.lastmod}</lastmod>
      <changefreq>hourly</changefreq>
    </url>
  `;
};

const sitemap = async () => {
  const domain = 'https://mcansh.blog';
  const fileName = 'sitemap.xml';
  const targetFolder = path.join(__dirname, '..', '..', 'static');

  const pages = glob
    .sync(path.join(__dirname, '..', '..', 'pages', '/**/*'))
    .map((page: string) => {
      const stats = fs.statSync(page);
      const lastmod = new Date(stats.mtime).toISOString();
      const { name } = path.parse(page);
      return {
        lastmod,
        name,
      };
    })
    .filter((page: { name: string; lastmod: string }) => {
      const skip = /_document|_app/;
      if (skip.test(page.name)) return null;
      return page;
    });

  const writeLocation = `${
    targetFolder.endsWith('/') ? targetFolder : `${targetFolder}/`
  }${fileName}`;

  const xml = `${xmlUrlWrapper(
    pages.map(page => xmlUrlNode(domain, page)).filter(Boolean).join(`
  `)
  )}`;

  try {
    await writeFile(writeLocation, xml);
    console.log(
      `${fileName} with ${pages.length} entries was written to ${writeLocation}`
    );
  } catch (error) {
    throw error;
  }
};

export default sitemap;
