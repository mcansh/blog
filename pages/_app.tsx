import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '~/components/styles/global-style';
import { colors } from '~/config';
import Document from '~/components/layouts/document';
import { NProgress } from '~/components/nprogress';

const App = ({ Component, pageProps }: AppProps) => {
  const statusCode = pageProps?.statusCode ?? 200;

  React.useEffect(() => {
    const tracker = window.document.createElement('script');
    const firstScript = window.document.getElementsByTagName('script')[0];
    tracker.defer = true;
    tracker.setAttribute('site', process.env.FATHOM_SITE_ID);
    tracker.setAttribute('spa', 'auto');
    tracker.src = `${process.env.FATHOM_SUBDOMAIN}/script.js`;
    firstScript.parentNode?.insertBefore(tracker, firstScript);
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
