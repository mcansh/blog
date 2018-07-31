import React, { Fragment } from 'react';
import App, { Container } from 'next/app';
import { IntlProvider } from 'react-intl';
import Raven from 'raven';
import { ThemeProvider, injectGlobal } from 'styled-components';
import { ApolloProvider } from 'react-apollo';
import { MDXProvider } from '@mdx-js/tag';
import withApolloClient from '../lib/withData';
import colors from '../config';
import { version } from '../package.json';
import Document from '../components/layouts/Document';
import Meta from '../components/Meta';
import Error from './_error';
import components from '../components';

const isDev = process.env.NODE_ENV === 'development';

injectGlobal`
  html {
    font-size: 10px;
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
    margin: 0;
  }


  body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-weight: 400;
    margin: 0;
    background: ${colors.background};
  }

  ::selection {
    background: ${colors.primary};
    color: white;
  }

  a {
    color: ${colors.primary};
    text-decoration-skip: ink;
    transition: 300ms all ease-in-out;
  }

  a:hover {
    color: ${colors.secondary};
  }

  a::selection {
    color: white;
  }

  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background: ${colors.primary};
    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;
    width: 100%;
    height: 0.2rem;
  }

  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background: ${colors.primary};
    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;
    width: 100%;
    height: 0.2rem;
  }

  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0;
    width: 10rem;
    height: 100%;
    box-shadow: 0 0 1rem ${colors.primary}, 0 0 0.5rem ${colors.primary};
    opacity: 1;
    transform: rotate(3deg) translate(0, -0.4rem);
  }

  .nprogress-custom-parent {
    overflow: hidden;
    position: relative;
  }

  .nprogress-custom-parent #nprogress .spinner,
  .nprogress-custom-parent #nprogress .bar {
    position: absolute;
  }
`;

class MyApp extends App {
  constructor(props) {
    super(props);

    if (!isDev) {
      Raven.config(process.env.SENTRY, {
        release: version,
        environment: process.env.NODE_ENV,
      }).install();
    }
  }

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    const { req } = ctx;
    // eslint-disable-next-line no-underscore-dangle
    const { locale, messages } = req || window.__NEXT_DATA__.props.pageProps;
    const now = Date.now();

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
      const { statusCode } = pageProps;
      if (statusCode !== 200) {
        ctx.res.statusCode = statusCode;
        return { statusCode };
      }
    }

    return { pageProps: { ...pageProps, locale, messages, now } };
  }

  componentDidCatch(error, errorInfo) {
    super.componentDidCatch(error, errorInfo);

    if (!isDev) {
      Raven.captureException(error, { extra: errorInfo });
    } else {
      console.error({ error, errorInfo });
    }
  }

  render() {
    const {
      Component,
      pageProps: { locale = 'en', now, messages },
      apolloClient,
      statusCode,
    } = this.props;

    return (
      <IntlProvider messages={messages} initialNow={now} locale={locale}>
        <Container>
          <ThemeProvider theme={colors}>
            <MDXProvider components={components}>
              <ApolloProvider client={apolloClient}>
                <Fragment>
                  <Meta />
                  {statusCode ? (
                    <Error statusCode={statusCode} />
                  ) : (
                    <Document>
                      <Component {...this.props.pageProps} />
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
