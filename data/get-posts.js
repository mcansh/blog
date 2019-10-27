const fs = require('fs');
const path = require('path');

const META = /export\s+const\s+meta\s+=\s+(\{(\n|.)*?\n\})/;
const DIR = path.join(process.cwd(), './pages/');
const files = fs.readdirSync(DIR).filter(file => file.endsWith('.mdx'));

const posts = files
  .map(file => {
    const name = path.join(DIR, file);
    const contents = fs.readFileSync(name, 'utf8');

    const match = META.exec(contents);
    if (!match || typeof match[1] !== 'string')
      throw new Error(`${name} needs to export const meta = {}`);

    // eslint-disable-next-line no-eval
    const meta = eval(`(${match[1]})`);
    const fileStat = fs.statSync(name);

    return {
      ...meta,
      path: `/${file.replace(/\.mdx$/, '')}`,
      lastModified: fileStat.mtime,
    };
  })
  .filter(post => post.published !== false)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

module.exports = posts;
