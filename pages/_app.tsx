import React, { StrictMode } from 'react';
import App, { Container, AppContext } from 'next/app';
import * as Sentry from '@sentry/browser';
import { ThemeProvider } from 'styled-components';
import Router from 'next/router';
// @ts-ignore
import withGA from 'next-ga';
import NProgress from '~/components/styles/nprogress';
import GlobalStyle from '~/components/styles/global-style';
import { colors } from '~/config';
import Document from '~/components/layouts/document';

Sentry.init({
  dsn: process.env.SENTRY,
  release: `blog@${process.env.VERSION}`,
  environment: process.env.NODE_ENV,
});

interface Props {
  Component: React.Component;
  pageProps: Record<string, any>;
  locale: string;
  initialNow: number;
}

class MyApp extends App<Props> {
  public static getInitialProps = async ({ Component, ctx }: AppContext) => {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  };

  public componentDidCatch(error: Error, errorInfo: any) {
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });

      Sentry.captureException(error);
    });

    super.componentDidCatch(error, errorInfo);
  }

  public render() {
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

export default withGA(process.env.ANALYTICS, Router)(MyApp);
