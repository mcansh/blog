// @flow
// $FlowFixMe StrictMode isn't typed yet
import React, { StrictMode } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import App, { Container } from 'next/app';
import { ThemeProvider } from 'styled-components';
import * as Sentry from '@sentry/browser';

import { colors } from '../config';
import GlobalStyles from '../components/GlobalStyles';
import Meta from '../components/Meta';
import Footer from '../components/Footer';
import { version, repository } from '../package.json';
import randomEmoji from '../utils/emojis';

NProgress.configure({ showSpinner: false });
// $FlowFixMe
Router.events.on('routeChangeStart', () => NProgress.start());
// $FlowFixMe
Router.events.on('routeChangeComplete', () => NProgress.done());
// $FlowFixMe
Router.events.on('routeChangeError', () => NProgress.done());

if (global.document) {
  const info = [
    `Version: ${version}`,
    `You can find the code here: https://github.com/${repository}`,
    `Thanks for stopping by ${randomEmoji()}`,
  ];
  // eslint-disable-next-line no-console
  info.forEach(message => console.log(message));
}

class MyApp extends App {
  // $FlowFixMe
  constructor(...args) {
    super(...args);
    Sentry.init({
      dsn: process.env.SENTRY,
      release: version,
      environment: process.env.NODE_ENV,
      serverName: process.env.NOW != null ? 'now.sh' : 'localhost',
    });
  }

  // $FlowFixMe: next hasnt typed this out yet: https://github.com/zeit/next.js/issues/3336
  static getInitialProps = async ({ Component, ctx }) => {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  };

  componentDidMount = () => {
    if (process.env.NODE_ENV === 'production') {
      if (
        'serviceWorker' in navigator &&
        navigator.serviceWorker != null &&
        navigator.serviceWorker.register != null
      ) {
        navigator.serviceWorker
          .register('/sw.js')
          .then(() => {
            console.log('SW registered');
          })
          .catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
          });
      }
    }
  };

  // $FlowFixMe
  componentDidCatch(error, errorInfo) {
    Sentry.captureException(error, { extra: errorInfo });
    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <StrictMode>
        <Container>
          <ThemeProvider theme={colors}>
            <>
              <GlobalStyles />
              <Meta />
              <Component {...pageProps} />
              <Footer />
            </>
          </ThemeProvider>
        </Container>
      </StrictMode>
    );
  }
}

export default MyApp;
