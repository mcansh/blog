import React from 'react';
import App from 'next/app';
import * as Sentry from '@sentry/browser';
import Router from 'next/router';
import { ThemeProvider } from 'styled-components';

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
  err?: Error;
}

class MyApp extends App<Props> {
  public componentDidMount() {
    initGA();
    logPageView();
    Router.events.on('routeChangeComplete', logPageView);
  }

  public render() {
    const { Component, pageProps } = this.props;

    // https://github.com/zeit/next.js/pull/8684/files?file-filters%5B%5D=.js&file-filters%5B%5D=.json#diff-3418d602a84e69f78132b489a2062cc0R14
    const { err } = this.props;
    const modifiedPageProps = { ...pageProps, err };

    return (
      <React.StrictMode>
        <ThemeProvider theme={colors}>
          <>
            <GlobalStyle />
            <Document>
              <Component {...modifiedPageProps} />
            </Document>
          </>
        </ThemeProvider>
      </React.StrictMode>
    );
  }
}

export default MyApp;
