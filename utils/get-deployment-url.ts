import { homepage } from '~/package.json';

function getDeploymentURL(path?: string) {
  const prefix =
    process.env.ENV === 'production' ? homepage : process.env.VERCEL_URL;
  const leadingSlash = path
    ? path.startsWith('/')
      ? path
      : `/${path}`
    : undefined;

  if (path) return `${prefix}${leadingSlash}`;
  return prefix;
}

export { getDeploymentURL };
