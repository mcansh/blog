import { description, productName, productShortName } from '../package.json';
import colors from '../config';

const iconSizes = [72, 96, 128, 144, 256, 512];

const icons = iconSizes.map(icon => ({
  src: `/static/images/logo/logo-${icon}.png`,
  sizes: `${icon}x${icon}`,
}));

const manifest = () => `
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

export default manifest;
