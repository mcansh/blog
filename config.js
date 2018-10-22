const colors = {
  primary: '#6c16c7',
  background: '#f7f7f7',
};

const MMMMDDYYYY = {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
};

const unsplashParams = url => {
  if (url == null) return '';
  return url.includes('unsplash.com')
    ? `${url}?utm_source=unsplash&utm_medium=referral&utm_content=mcansh_blog`
    : url;
};

export { colors, MMMMDDYYYY, unsplashParams };
export default colors;
