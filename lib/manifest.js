import { description, productName, productShortName } from '../package.json';
import colors from '../theme';

const manifest = () => `
{
  "name": "${productName}",
  "short_name": "${productShortName}",
  "description": "${description}",
  "start_url": "/?homescreen=1",
  "background_color": "${colors.primary}",
  "theme_color": "${colors.primary}",
  "display": "standalone",
  "icons": [
    {
      "src": "/static/images/logo/logo.svg",
      "sizes": "72x72 96x96 128x128 144x144 256x256 512x512"
    }
  ]
}
`;

export default manifest;
