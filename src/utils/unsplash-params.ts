const unsplashParams = (url?: string | undefined): string => {
  if (url == null) return '';
  return url.startsWith('https://unsplash.com')
    ? `${url}?utm_source=unsplash&utm_medium=referral&utm_content=mcansh_blog`
    : url;
};

export default unsplashParams;
