import send from '@polka/send-type';
import { description, productName, productShortName } from '../package.json';
import { colors } from '../config';
import { cacheTimesInSeconds } from './caching';

const manifest = (req, res) => {
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
      "icons": ${JSON.stringify(icons, null, 2)}
    }
  `;

  send(res, 200, json, {
    'Content-Type': 'application/json',
    'Cache-Control': `max-age=${cacheTimesInSeconds.week}, must-revalidate`,
  });
};

export default manifest;
