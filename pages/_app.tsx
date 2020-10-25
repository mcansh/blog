import 'styles/index.css';

import React from 'react';
import { AppProps } from 'next/app';
import * as Fathom from 'fathom-client';
import Router from 'next/router';

import Document from '~/components/layouts/document';

Router.events.on('routeChangeComplete', () => {
  Fathom.trackPageview();
});

const App = ({ Component, pageProps }: AppProps) => {
  React.useEffect(() => {
    Fathom.load(process.env.FATHOM_SITE_ID, {
      excludedDomains: ['localhost'],
      url: `${process.env.FATHOM_SUBDOMAIN}/script.js`,
    });
  }, []);

  return (
    <Document>
      <Component {...pageProps} />
    </Document>
  );
};

export default App;
