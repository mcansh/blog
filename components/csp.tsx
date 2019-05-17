import crypto from 'crypto';
import { NextScript, DocumentProps } from 'next/document';

const cspHashOf = (text: string) => {
  const hash = crypto.createHash('sha256');
  hash.update(text);
  return `'sha256-${hash.digest('base64')}'`;
};

const CSP = (props: DocumentProps) => {
  const cspSettings = {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      'https://polyfill.io/v3/polyfill.min.js',
      "'unsafe-eval'",
      "'unsafe-inline'",
      'www.google-analytics.com',
      'https://s3.amazonaws.com',
    ],
    'connect-src': ["'self'", 'ws://localhost:*', 'https://sentry.io/'],
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': [
      "'self'",
      'https://res.cloudinary.com/dof0zryca/',
      'data:',
      'www.google-analytics.com',
    ],
  };

  const csp = `${Object.entries(cspSettings)
    .map(item => `${item[0]} ${item[1].join(' ')}`)
    .join(';')} ${cspHashOf(NextScript.getInlineScriptSource(props))}`;

  return <meta httpEquiv="Content-Security-Policy" content={csp} />;
};

export default CSP;
