import crypto from 'crypto';

import { NextScript, DocumentProps } from 'next/document';

import { getDeploymentURL } from '~/utils/get-deployment-url';

const cspHashOf = (text: string) => {
  const hash = crypto.createHash('sha256');
  hash.update(text);
  return `sha256-${hash.digest('base64')}`;
};

const getCSP = (props: DocumentProps) => {
  const hash = cspHashOf(NextScript.getInlineScriptSource(props));

  const cspSettings = {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      'data:',
      'https://storage.googleapis.com',
      "'unsafe-eval'",
      "'unsafe-inline'",
      `${process.env.FATHOM_SUBDOMAIN}/script.js`,
    ],
    'connect-src': ["'self'", 'https://sentry.io'],
    'manifest-src': ["'self'"],
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': [
      "'self'",
      'data:',
      process.env.FATHOM_SUBDOMAIN,
      getDeploymentURL(),
    ],
  };

  const csp = `${Object.entries(cspSettings)
    .map(item => `${item[0]} ${item[1].filter(Boolean).join(' ')}`)
    .join(';')}`;

  return { csp, hash };
};

export { getCSP };
