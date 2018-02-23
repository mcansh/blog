const colors = {
  primary: '#6c16c7',
};

export const unsplashParams = url =>
  url.includes('unsplash.com')
    ? `${url}?utm_source=unsplash&utm_medium=referral&utm_content=mcansh_blog`
    : url || '';

export default colors;
