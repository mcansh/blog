import React, { StrictMode } from 'react';
import App, { Container } from 'next/app';
import * as Sentry from '@sentry/browser';
import Router from 'next/router';
import { ThemeProvider } from 'styled-components';
import { NProgress } from '@mcansh/next-nprogress';

import GlobalStyle from '~/components/styles/global-style';
import { colors } from '~/config';
import Document from '~/components/layouts/document';
import { initGA, logPageView } from '~/lib/gtag';

Sentry.init({
  dsn: process.env.SENTRY,
  release: `blog@${process.env.VERSION}_${process.env.BUILD_ID}`,
  environment: process.env.NODE_ENV,
});

interface Props {
  Component: React.Component;
  pageProps: Record<string, any>;
  locale: string;
  initialNow: number;
}

class MyApp extends App<Props> {
  public componentDidCatch(error: Error, errorInfo: any) {
    Sentry.withScope(scope => {
      scope.setExtras(errorInfo);
      Sentry.captureException(error);
    });

    super.componentDidCatch(error, errorInfo);
  }

  public componentDidMount() {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
  }

  public render() {
    Router.events.on('routeChangeComplete', (url: string) => logPageView(url));
    const { Component, pageProps } = this.props;

    return (
      <StrictMode>
        <Container>
          <ThemeProvider theme={colors}>
            <>
              <NProgress
                color={colors.primary}
                options={{ trickleSpeed: 50 }}
                spinner={false}
              />
              <GlobalStyle />
              <Document>
                <Component {...pageProps} />
              </Document>
            </>
          </ThemeProvider>
        </Container>
      </StrictMode>
    );
  }
}

export default MyApp;
