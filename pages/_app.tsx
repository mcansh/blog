import React from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import * as Fathom from 'fathom-client';
import Router from 'next/router';
import ProgressBar from '@badrap/bar-of-progress';

import GlobalStyle from '~/components/styles/global-style';
import { colors } from '~/config';
import Document from '~/components/layouts/document';

const progress = new ProgressBar({
  size: 2,
  color: '#0448f8',
  className: 'bar-of-progress',
  delay: 1000,
});

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeError', progress.finish);
Router.events.on('routeChangeComplete', () => {
  Fathom.trackPageview();
  progress.finish();
});

const App = ({ Component, pageProps }: AppProps) => {
  const statusCode = pageProps?.statusCode ?? 200;

  React.useEffect(() => {
    Fathom.load(process.env.FATHOM_SITE_ID, {
      excludedDomains: ['localhost'],
      url: `${process.env.FATHOM_SUBDOMAIN}/script.js`,
    });
  }, []);

  return (
    <ThemeProvider theme={colors}>
      <GlobalStyle />
      {statusCode !== 200 ? (
        <Component {...pageProps} />
      ) : (
        <Document>
          <Component {...pageProps} />
        </Document>
      )}
    </ThemeProvider>
  );
};

export default App;
