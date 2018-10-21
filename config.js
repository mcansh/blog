// @flow

const colors = {
  primary: '#6c16c7',
  background: '#f7f7f7',
};

const MMMMDDYYYY = {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
};

const unsplashParams = (url: string | null): string => {
  if (url != null) {
    return url.includes('unsplash.com')
      ? `${url}?utm_source=unsplash&utm_medium=referral&utm_content=mcansh_blog`
      : url;
  }
  return '';
};

export { colors, MMMMDDYYYY, unsplashParams };
export default colors;
