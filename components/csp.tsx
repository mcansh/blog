import crypto from 'crypto';
import { NextScript, DocumentProps } from 'next/document';

const cspHashOf = (text: string) => {
  const hash = crypto.createHash('sha256');
  hash.update(text);
  return `'sha256-${hash.digest('base64')}'`;
};

const CSP = (props: DocumentProps) => {
  const cspSettings = {
    'default-src': ["'none'"],
    'script-src': [
      "'self'",
      'https://polyfill.io/v3/polyfill.min.js',
      'www.googletagmanager.com',
      'www.google-analytics.com',
      'https://storage.googleapis.com',
    ],
    'connect-src': [
      "'self'",
      'ws://localhost:*',
      'https://sentry.io/',
      'www.google-analytics.com',
      'https://res.cloudinary.com/dof0zryca',
    ],
    'manifest-src': ["'self'"],
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': [
      "'self'",
      'https://res.cloudinary.com/dof0zryca/',
      'data:',
      'www.googletagmanager.com',
      'www.google-analytics.com',
    ],
  };

  if (process.env.NODE_ENV !== 'production') {
    cspSettings['script-src'].push("'unsafe-eval'", "'unsafe-inline'");
  }

  const csp = `${Object.entries(cspSettings)
    .map(item => `${item[0]} ${item[1].join(' ')}`)
    .join(';')} ${cspHashOf(NextScript.getInlineScriptSource(props))}`;

  return <meta httpEquiv="Content-Security-Policy" content={csp} />;
};

export default CSP;
