// @flow
import React from 'react';
import Document_, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class Document extends Document_ {
  // $FlowFixMe: next hasnt typed this out yet: https://github.com/zeit/next.js/issues/3336
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
      });
    const initialProps = await Document_.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: [...initialProps.styles, ...sheet.getStyleElement()],
    };
  }

  render() {
    return (
      <html lang="en">
        <Head>{this.props.styles}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default Document;
