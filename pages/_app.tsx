import React from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import * as Fathom from 'fathom-client';
import Router from 'next/router';

import GlobalStyle from '~/components/styles/global-style';
import { colors } from '~/config';
import Document from '~/components/layouts/document';
import { NProgress } from '~/components/nprogress';

Router.events.on('routeChangeComplete', () => {
  Fathom.trackPageview();
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
      <NProgress
        color={colors.primary}
        options={{ trickleSpeed: 50 }}
        spinner={false}
      />
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
