import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import colors from '../theme';

class Page extends Document {
  static async getInitialProps(context) {
    // styled-components
    const { renderPage } = context;
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    // react-intl
    const props = await super.getInitialProps(context);
    const { req: { locale, localeDataScript } } = context;
    return {
      ...page,
      ...props,
      styleTags,
      locale,
      localeDataScript,
    };
  }

  render() {
    const { locale, styleTags } = this.props;
    const polyfill = `https://cdn.polyfill.io/v2/polyfill.min.js?features=Intl.~locale.${locale}`;

    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width, viewport-fit=cover"
          />
          {process.env.NODE_ENV !== 'development' && (
            <link rel="manifest" href="/manifest.json" />
          )}
          <link type="text/plain" rel="author" href="/static/humans.txt" />
          <link
            rel="mask-icon"
            href="/static/images/logo/safari.svg"
            color={colors.primary}
          />
          <meta name="theme-color" content={colors.primary} />
          <link rel="shortcut icon" href="/static/images/logo/logo.png" />
          <link rel="shortcut icon" href="/static/images/logo/logo.ico" />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="228x228"
            href="/static/images/logo/logo-228.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="195x195"
            href="/static/images/logo/logo-195.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="152x152"
            href="/static/images/logo/logo-152.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="144x144"
            href="/static/images/logo/logo-144.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="128x128"
            href="/static/images/logo/logo-128.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="120x120"
            href="/static/images/logo/logo-120.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="96x96"
            href="/static/images/logo/logo-96.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="72x72"
            href="/static/images/logo/logo-72.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            href="/static/images/logo/logo-57.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            href="/static/images/logo/logo-32.png"
            sizes="32x32"
          />
          <link
            rel="alternate"
            href="/atom"
            type="application/atom+xml"
            title="RSS Feed"
          />
          <link
            rel="alternate"
            href="/feed.json"
            type="application/json"
            title="JSON Feed"
          />
          {styleTags}
        </Head>
        <body>
          <Main />
          <script src={polyfill} />
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: this.props.localeDataScript,
            }}
          />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default Page;
