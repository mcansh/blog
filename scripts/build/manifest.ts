// Native
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

// Packages
import * as prettier from 'prettier';
import { description, productName, productShortName } from '../../package.json';
import { colors } from '../../config';

const writeFile = promisify(fs.writeFile);

const manifest = async () => {
  const fileName = 'manifest.json';
  const targetFolder = path.join(__dirname, '..', '..', 'static');

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

  const writeLocation = `${
    targetFolder.endsWith('/') ? targetFolder : `${targetFolder}/`
  }${fileName}`;

  try {
    await writeFile(writeLocation, prettyJSON);
    console.log(`${fileName} was written to ${writeLocation}`);
  } catch (error) {
    throw error;
  }
};

export default manifest;
