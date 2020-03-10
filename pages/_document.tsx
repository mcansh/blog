import React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

import getCSP from '~/components/csp';

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

          {process.env.NODE_ENV === 'production' && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
                <!-- Fathom - simple website analytics - https://usefathom.com -->
                (function(f, a, t, h, o, m){
                  a[h]=a[h]||function(){
                    (a[h].q=a[h].q||[]).push(arguments)
                  };
                  o=f.createElement('script'),
                  m=f.getElementsByTagName('script')[0];
                  o.async=1; o.src=t; o.id='fathom-script';
                  m.parentNode.insertBefore(o,m)
                })(document, window, 'https://cdn.usefathom.com/tracker.js', 'fathom');
                fathom('set', 'siteId', '${process.env.FATHOM_SITE_ID}');
                fathom('trackPageview');
                <!-- / Fathom -->
              `,
              }}
            />
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
