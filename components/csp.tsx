import crypto from 'crypto';
import { NextScript } from 'next/document';

const cspHashOf = (text: string) => {
  const hash = crypto.createHash('sha256');
  hash.update(text);
  return `'sha256-${hash.digest('base64')}'`;
};

const CSP = props => {
  const cspSettings = {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      'https://polyfill.io/v3/polyfill.min.js',
      "'unsafe-eval'",
      "'unsafe-inline'",
      'https://www.google-analytics.com/analytics.js',
    ],
    'connect-src': ["'self'", 'ws://localhost:*'],
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': ["'self'", 'https://res.cloudinary.com/dof0zryca/', 'data:'],
  };

  const csp = `${Object.entries(cspSettings)
    .map(item => `${item[0]} ${item[1].join(' ')}`)
    .join(';')} ${cspHashOf(
    // @ts-ignore
    NextScript.getInlineScriptSource(props)
  )}`;

  return <meta httpEquiv="Content-Security-Policy" content={csp} />;
};

export default CSP;
