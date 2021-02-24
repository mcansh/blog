function unsplashParams(url?: string | undefined): string {
  if (url == null) return '';

  const searchParams = new URLSearchParams({
    utm_source: 'unsplash',
    utm_medium: 'referral',
    utm_content: 'mcansh_blog',
  });

  return url.startsWith('https://unsplash.com')
    ? `${url}?${searchParams.toString()}`
    : url;
}

export { unsplashParams };
