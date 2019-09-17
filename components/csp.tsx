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
    'default-src': ["'none'"],
    'script-src': [
      "'self'",
      'data:',
      'www.googletagmanager.com',
      'www.google-analytics.com',
      'storage.googleapis.com',
      'cdn.ampproject.org/v0.js',
    ],
    'connect-src': [
      "'self'",
      'sentry.io',
      'www.googletagmanager.com',
      'www.google-analytics.com',
    ],
    'manifest-src': ["'self'"],
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': [
      "'self'",
      'res.cloudinary.com/dof0zryca/',
      'data:',
      'www.googletagmanager.com',
      'www.google-analytics.com',
    ],
  };

  if (process.env.NODE_ENV === 'development') {
    cspSettings['script-src'].push("'unsafe-eval'", "'unsafe-inline'");
  }

  const csp = `${Object.entries(cspSettings)
    .map(item => `${item[0]} ${item[1].join(' ')}`)
    .join(';')}`;

  return { csp, hash };
};

export default CSP;
