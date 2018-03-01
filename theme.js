const colors = {
  primary: '#6c16c7',
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
