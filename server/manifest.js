const send = require('@polka/send-type')
const { description, productName, productShortName } = require('../package.json')
const { colors } = require('../config')

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

  send(res, 200, json);
};

module.exports = manifest;
