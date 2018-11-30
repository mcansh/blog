// Native
const fs = require('fs');
const { join } = require('path');
const { promisify } = require('util');

// Packages
const prettier = require('prettier');
const {
  description,
  productName,
  productShortName,
} = require('../package.json');
const { colors } = require('../config');

const writeFile = promisify(fs.writeFile);

const manifest = async () => {
  const iconSizes = [72, 96, 128, 144, 256, 512];

  const icons = iconSizes.map(icon => ({
    src: `/static/images/logo/logo-${icon}.png`,
    sizes: `${icon}x${icon}`,
  }));

  const json = `
    {
      "name": "${productName}",
      "short_name": "${productShortName}",
      "description": "${description}",
      "start_url": "/?homescreen=1",
      "background_color": "${colors.primary}",
      "theme_color": "${colors.primary}",
      "display": "standalone",
      "icons": ${JSON.stringify(icons)}
    }
  `;

  const prettyJSON = prettier.format(json, { parser: 'json' });

  const manifestPath = join(__dirname, '..', 'static/manifest.json');

  await writeFile(manifestPath, prettyJSON);
};

module.exports = manifest;
