import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import colors from '../theme';

class Page extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width, viewport-fit=cover"
          />
          <link rel="manifest" href="/static/manifest.json" />
          <link type="text/plain" rel="author" href="/static/humans.txt" />
          <link
            rel="mask-icon"
            href="/static/images/logo/logo.svg"
            color={colors.primary}
          />
          <meta name="theme-color" content={colors.primary} />
          {/* Icons and stuff */}
          <link rel="shortcut icon" href="/static/images/favicon.png" />
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
          {/* FEEEEEEEDS */}
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
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default Page;
