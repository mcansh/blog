import React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import * as Sentry from '@sentry/browser';
import { ServerStyleSheet } from 'styled-components';
import getCSP from '~/components/csp';

process.on('unhandledRejection', err => {
  Sentry.captureException(err);
});

process.on('uncaughtException', err => {
  Sentry.captureException(err);
});

class MyDocument extends Document {
  public static async getInitialProps(context: DocumentContext) {
    const sheet = new ServerStyleSheet();

    const originalRenderPage = context.renderPage;
    context.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(context);
    return {
      ...initialProps,
      styles: [
        ...(Array.isArray(initialProps.styles) ? initialProps.styles : []),
        ...sheet.getStyleElement(),
      ],
    };
  }

  public render() {
    const { inAmpMode } = this.props;
    const { csp, hash } = getCSP(this.props);

    return (
      <Html lang="en">
        <Head>
          {!inAmpMode && (
            <meta httpEquiv="Content-Security-Policy" content={csp} />
          )}
        </Head>
        <body>
          <Main />
          <div id="portal" />
          <NextScript nonce={hash} />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
