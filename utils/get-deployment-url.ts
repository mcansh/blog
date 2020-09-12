import { homepage } from '~/package.json';

function getDeploymentURL() {
  return process.env.ENV === 'production' ? homepage : process.env.VERCEL_URL;
}

export { getDeploymentURL };
