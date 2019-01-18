import React from 'react';
import Document, {
  Head,
  Main,
  NextScript,
  NextDocumentContext,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import crypto from 'crypto';

interface Props {
  styles: string;
  locale: string;
  localeDataScript: string;
}

const cspHashOf = (text: string) => {
  const hash = crypto.createHash('sha256');
  hash.update(text);
  return `'sha256-${hash.digest('base64')}'`;
};

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

    const cspSettings = [
      "default-src 'self'",
      "script-src 'self' https://polyfill.io/v3/polyfill.min.js 'unsafe-eval' 'unsafe-inline'",
      "connect-src 'self' ws://localhost:*",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' https://res.cloudinary.com/dof0zryca/",
    ];

    const csp = `${cspSettings.join(';')} ${cspHashOf(
      NextScript.getInlineScriptSource(this.props)
    )}`;

    return (
      <html lang={locale}>
        <Head>
          <meta httpEquiv="Content-Security-Policy" content={csp} />
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
