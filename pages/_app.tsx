import React from 'react';
import App from 'next/app';
import Router from 'next/router';
import { ThemeProvider } from 'styled-components';
import { NProgress } from '@mcansh/next-nprogress';

import GlobalStyle from '~/components/styles/global-style';
import { colors } from '~/config';
import Document from '~/components/layouts/document';
import { initGA, logPageView } from '~/lib/gtag';

class MyApp extends App {
  public componentDidMount() {
    initGA();
    logPageView();
    Router.events.on('routeChangeComplete', logPageView);
  }

  public render() {
    const { Component, pageProps } = this.props;

    const statusCode = pageProps?.statusCode ?? 200;

    return (
      <React.StrictMode>
        <ThemeProvider theme={colors}>
          <>
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
          </>
        </ThemeProvider>
      </React.StrictMode>
    );
  }
}

export default MyApp;
