import crypto from 'crypto';

import { NextScript, DocumentProps } from 'next/document';

const cspHashOf = (text: string) => {
  const hash = crypto.createHash('sha256');
  hash.update(text);
  return `sha256-${hash.digest('base64')}`;
};

const CSP = (props: DocumentProps) => {
  const hash = cspHashOf(NextScript.getInlineScriptSource(props));

  const cspSettings = {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      'data:',
      'https://tz8sxj4sit.mcansh.blog/tracker.js',
      'https://storage.googleapis.com',
      "'unsafe-eval'",
      "'unsafe-inline'",
      'https://cdn.usefathom.com',
      'http://tz8sxj4sit.mcansh.blog',
    ],
    'connect-src': ["'self'", 'sentry.io', 'https://tz8sxj4sit.mcansh.blog'],
    'manifest-src': ["'self'"],
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': [
      "'self'",
      'res.cloudinary.com/dof0zryca/',
      'data:',
      'https://collect.usefathom.com',
      'https://tz8sxj4sit.mcansh.blog',
    ],
  };

  const csp = `${Object.entries(cspSettings)
    .map(item => `${item[0]} ${item[1].filter(Boolean).join(' ')}`)
    .join(';')}`;

  return { csp, hash };
};

export default CSP;
