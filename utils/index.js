// @flow

const unsplashParams = (url?: string | null): string => {
  if (url == null) return '';
  return url.includes('unsplash.com')
    ? `${url}?utm_source=unsplash&utm_medium=referral&utm_content=mcansh_blog`
    : url;
};

export default unsplashParams;
