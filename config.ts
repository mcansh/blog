const iconSizes = [32, 57, 72, 96, 120, 128, 144, 152, 195, 228, 256, 512];

const colors = {
  primary: '#6c16c7',
  background: '#f7f7f7',
};

const navigationLinks = [
  {
    name: 'Home',
    slug: '/',
  },
  {
    name: 'GitHub',
    slug: `https://github.com/${process.env.GITHUB}`,
  },
  {
    name: 'Twitter',
    slug: `https://twitter.com/${process.env.TWITTER}`,
  },
  {
    name: 'Instagram',
    slug: `https://instagram.com/${process.env.INSTAGRAM}`,
  },
  {
    name: 'Email',
    slug: `mailto:${process.env.EMAIL}`,
  },
  {
    name: 'Changelog',
    slug: `${process.env.GITHUB_URL}/releases`,
  },
];

export default colors;
export { colors, iconSizes, navigationLinks };
