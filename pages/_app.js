import React, { Fragment } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import App, { Container } from 'next/app';
import { IntlProvider, addLocaleData } from 'react-intl';
import Raven from 'raven';
import { ThemeProvider } from 'styled-components';
import { ApolloProvider } from 'react-apollo';
import { MDXProvider } from '@mdx-js/tag';
import GlobalStyles from '../components/GlobalStyles';
import withApolloClient from '../lib/withData';
import colors from '../config';
import { version } from '../package.json';
import Document from '../components/layouts/Document';
import Meta from '../components/Meta';
import Error from './_error';
import components from '../components';

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

// Register React Intl's locale data for the user's locale in the browser. This
// locale data was added to the page by `pages/_document.js`. This only happens
// once, on initial page load in the browser.
if (typeof window !== 'undefined' && window.ReactIntlLocaleData) {
  Object.keys(window.ReactIntlLocaleData).forEach(lang => {
    addLocaleData(window.ReactIntlLocaleData[lang]);
  });
}

class MyApp extends App {
  constructor(...args) {
    super(...args);
    Raven.config(process.env.SENTRY, {
      release: version,
      environment: process.env.NODE_ENV,
    }).install();
  }

  static getInitialProps = async ({ Component, ctx }) => {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
      const { statusCode } = pageProps;
      if (statusCode !== 200) {
        ctx.res.statusCode = statusCode;
        return { statusCode };
      }
    }

    // Get the `locale` and `messages` from the request object on the server.
    // In the browser, use the same values that the server serialized.
    const { req } = ctx;
    const { locale, messages } = req || window.__NEXT_DATA__.props.pageProps;

    return { pageProps, locale, messages };
  };

  componentDidCatch(error, errorInfo) {
    Raven.captureException(error, { extra: errorInfo });
    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const {
      Component,
      pageProps,
      locale,
      messages,
      apolloClient,
      statusCode,
    } = this.props;

    const now = Date.now();

    return (
      <IntlProvider messages={messages} initialNow={now} locale={locale}>
        <Container>
          <ThemeProvider theme={colors}>
            <MDXProvider components={components}>
              <ApolloProvider client={apolloClient}>
                <GlobalStyles />
                <Fragment>
                  <Meta />
                  {statusCode ? (
                    <Error statusCode={statusCode} />
                  ) : (
                    <Document>
                      <Component {...pageProps} />
                    </Document>
                  )}
                </Fragment>
              </ApolloProvider>
            </MDXProvider>
          </ThemeProvider>
        </Container>
      </IntlProvider>
    );
  }
}

export default withApolloClient(MyApp);
