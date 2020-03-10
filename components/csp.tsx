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
      props.inAmpMode && 'cdn.ampproject.org/v0.js',
      'http://cdn.usefathom.com/tracker.js',
      "'unsafe-eval'",
      "'unsafe-inline'",
    ],
    'connect-src': ["'self'", 'sentry.io'],
    'manifest-src': ["'self'"],
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': ["'self'", 'res.cloudinary.com/dof0zryca/', 'data:'],
  };

  const csp = `${Object.entries(cspSettings)
    .map(item => `${item[0]} ${item[1].filter(Boolean).join(' ')}`)
    .join(';')}`;

  return { csp, hash };
};

export default CSP;
