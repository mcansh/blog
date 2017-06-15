import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const page = renderPage();
    return { ...page };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="mask-icon" href="/static/images/website_icon.svg" color="#E53A40" />
          <link rel="shortcut icon" href="/static/images/favicon.png" />
          <link rel="stylesheet" href="/static/css/style.css" />
          <link rel="alternate" href="/atom" type="application/atom+xml" title="RSS Feed" />
          <link rel="alternate" href="/feed.json" type="application/json" title="JSON Feed" />
        </Head>
        <body>
          <Main />
          <div>
            <NextScript />
          </div>
          <script src="/static/js/main.js" />
        </body>
      </html>
    );
  }
}
