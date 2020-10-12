import fs from 'fs';
import path from 'path';

import pkgJSON from '~/package.json';

const OUT_DIR = path.join(process.cwd(), 'public');

const iconSizes = [72, 96, 128, 144, 256, 512];

const icons = iconSizes.map(icon => ({
  src: `/static/images/logo/logo-${icon}.png`,
  sizes: `${icon}x${icon}`,
}));

const json = {
  name: 'Logan McAnsh',
  short_name: 'Blog',
  description: pkgJSON.description,
  start_url: '/?homescreen=1',
  background_color: '#6c16c7',
  theme_color: '#6c16c7',
  display: 'standalone',
  icons,
};

const manifest = () => {
  fs.writeFileSync(
    path.join(OUT_DIR, 'manifest.webmanifest'),
    JSON.stringify(json, null, 2)
  );
};

manifest();
