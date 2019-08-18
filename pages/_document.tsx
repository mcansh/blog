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
import CSP from '~/components/csp';

process.on('unhandledRejection', err => {
  Sentry.captureException(err);
});

process.on('uncaughtException', err => {
  Sentry.captureException(err);
});

interface Props {
  styles: string;
  locale: string;
  localeDataScript: string;
}

class MyDocument extends Document<Props> {
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
    const { locale, inAmpMode } = this.props;

    return (
      <Html lang={locale}>
        <Head>{!inAmpMode && <CSP {...this.props} />}</Head>
        <body>
          <Main />
          <div id="portal" />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
