import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

import { getCSP } from '~/components/csp';

class MyDocument extends Document {
  public render() {
    const { csp, hash } = getCSP(this.props);

    return (
      <Html lang="en">
        <Head>
          <meta httpEquiv="Content-Security-Policy" content={csp} />
        </Head>
        <body>
          <Main />
          <NextScript nonce={hash} />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
