const iconSizes = [228, 195, 152, 144, 128, 120, 96, 72, 57, 32];
/* istanbul ignore next */
const staticFilePrefix = process.env.NOW ? '' : '/static';

const colors = {
  primary: '#6c16c7',
  background: '#f7f7f7',
};

export { colors, iconSizes, staticFilePrefix };
export default colors;
