import React from 'react';
import App, { Container } from 'next/app';
import Raven from 'raven';
import { version } from '../package.json';
import Document from '../components/layouts/Document';

const isDev = process.env.NODE_ENV === 'development';

export default class MyApp extends App {
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

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
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
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Document>
          <Component {...pageProps} />
        </Document>
      </Container>
    );
  }
}
