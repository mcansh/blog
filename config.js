const colors = {
  primary: '#6c16c7',
  background: '#f7f7f7',
};

export const MMMMDDYYYY = {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
};

export const unsplashParams = url => {
  if (url) {
    return url.includes('unsplash.com')
      ? `${url}?utm_source=unsplash&utm_medium=referral&utm_content=mcansh_blog`
      : url;
  }
  return '';
};

export default colors;
