import React from 'react';
import Document, {
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
  amphtml: boolean;
}

// @ts-ignore
class MyDocument extends Document<Props> {
  static async getInitialProps(context: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = context.renderPage;

    try {
      context.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props: any) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(context);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    const { locale, styles, amphtml } = this.props;

    return (
      <html lang={locale}>
        <Head>
          {!amphtml && <CSP {...this.props} />}
          {styles}
        </Head>
        <body>
          <Main />
          <div id="portal" />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
