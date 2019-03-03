/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

const META = /export\s+const\s+meta\s+=\s+(\{(\n|.)*?\n\})/;
const DIR = path.join(process.cwd(), './pages/');

const files = fs.readdirSync(DIR).filter(file => file.endsWith('.mdx'));

const posts = files
  .map(file => {
    const name = path.join(DIR, file);
    const stats = fs.statSync(name);
    const lastmod = new Date(stats.mtime).toISOString();

    const contents = fs.readFileSync(name, 'utf8');
    const match = META.exec(contents);
    if (!match || typeof match[1] !== 'string')
      throw new Error(`${name} needs to export const meta = {}`);

    // eslint-disable-next-line no-eval
    const meta = eval(`(${match[1]})`);

    return {
      ...meta,
      lastmod,
      path: `/${file.replace(/\.mdx?$/, '')}`,
    };
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date));

module.exports = posts;
