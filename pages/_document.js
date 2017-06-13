import React from 'react';
import flush from 'styled-jsx/server';
import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const page = renderPage();
    const styles = flush();
    return { ...page, styles };
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
          <link href="/atom" type="application/atom+xml" rel="alternate" title="RSS Feed" />
          <link href="/feed.json" type="application/json" rel="alternate" title="JSON Feed" />
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
