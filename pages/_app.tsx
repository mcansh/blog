import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { NProgress } from '@mcansh/next-nprogress';
import Router from 'next/router';

import * as Fathom from '~/lib/fathom';
import GlobalStyle from '~/components/styles/global-style';
import { colors } from '~/config';
import Document from '~/components/layouts/document';

Router.events.on('routeChangeComplete', () => {
  Fathom.trackPageview();
});

const App = ({ Component, pageProps }: AppProps) => {
  const statusCode = pageProps?.statusCode ?? 200;

  React.useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      Fathom.load(undefined, '//tz8sxj4sit.mcansh.blog/tracker.js');
      Fathom.setSiteId(process.env.FATHOM_SITE_ID);
      Fathom.trackPageview();
    }
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
