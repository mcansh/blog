import React, { StrictMode } from 'react';
import App, { Container, NextAppContext } from 'next/app';
import { IntlProvider, addLocaleData, Messages } from 'react-intl';
import * as Sentry from '@sentry/browser';
import { ThemeProvider } from 'styled-components';
import NProgress from '~/components/Styles/NProgress';
import GlobalStyle from '~/components/Styles/GlobalStyle';
import { colors } from '~/config';
import { version } from '~/package.json';
import Document from '~/components/layouts/Document';
import Meta from '~/components/Meta';

// Register React Intl's locale data for the user's locale in the browser. This
// locale data was added to the page by `pages/_document.js`. This only happens
// once, on initial page load in the browser.
// @ts-ignore
if (typeof window !== 'undefined' && window.ReactIntlLocaleData) {
  // @ts-ignore
  Object.keys(window.ReactIntlLocaleData).forEach(lang => {
    // @ts-ignore
    addLocaleData(window.ReactIntlLocaleData[lang]);
  });
}

interface Props {
  Component: React.Component;
  pageProps: Record<string, any>;
  locale: string;
  messages: Messages;
  initialNow: number;
}

class MyApp extends App<Props> {
  constructor(...args) {
    // @ts-ignore
    super(...args);
    Sentry.init({
      dsn: process.env.SENTRY,
      release: version,
      environment: process.env.NODE_ENV,
      // @ts-ignore
      serverName: process.env.NOW != null ? 'now.sh' : 'localhost',
    });
  }

  static getInitialProps = async ({ Component, ctx }: NextAppContext) => {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    // Get the `locale` and `messages` from the request object on the server.
    // In the browser, use the same values that the server serialized.
    const { req } = ctx;
    // @ts-ignore
    const { locale, messages } = req || window.__NEXT_DATA__.props.pageProps;
    const initialNow = Date.now();

    return { pageProps, locale, messages, initialNow };
  };

  componentDidCatch(error, errorInfo) {
    Sentry.captureException(error);
    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const { Component, pageProps, locale, messages, initialNow } = this.props;

    return (
      <StrictMode>
        <IntlProvider
          messages={messages}
          initialNow={initialNow}
          locale={locale}
        >
          <Container>
            <ThemeProvider theme={colors}>
              <>
                <NProgress
                  color={colors.primary}
                  options={{ trickleSpeed: 50 }}
                  spinner={false}
                />
                <GlobalStyle />
                <Meta />
                <Document>
                  <Component {...pageProps} />
                </Document>
              </>
            </ThemeProvider>
          </Container>
        </IntlProvider>
      </StrictMode>
    );
  }
}

export default MyApp;
