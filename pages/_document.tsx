import React from 'react';
import Document, {
  Head,
  Main,
  NextScript,
  NextDocumentContext,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import CSP from '~/lib/csp.tsx';

interface Props {
  styles: string;
  locale: string;
  localeDataScript: string;
}

class MyDocument extends Document<Props> {
  static async getInitialProps(context: NextDocumentContext) {
    // styled-components
    const sheet = new ServerStyleSheet();

    const originalRenderPage = context.renderPage;
    context.renderPage = () =>
      originalRenderPage({
        // @ts-ignore
        enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(context);
    // react-intl

    const {
      // @ts-ignore
      req: { locale, localeDataScript },
    } = context;

    return {
      ...initialProps,
      locale,
      localeDataScript,
      // @ts-ignore
      styles: [...initialProps.styles, ...sheet.getStyleElement()],
    };
  }

  render() {
    const { locale, styles, localeDataScript } = this.props;
    const features = ['default', 'Intl', `Intl.~locale.${locale}`].join();
    const encodedFeatures = encodeURIComponent(features);
    const polyfill = `https://polyfill.io/v3/polyfill.min.js?flags=gated&features=${encodedFeatures}`;

    return (
      <html lang={locale}>
        <Head>
          <CSP {...this.props} />
          {styles}
        </Head>
        <body>
          <Main />
          <div id="portal" />
          <script src={polyfill} />
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: localeDataScript,
            }}
          />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
