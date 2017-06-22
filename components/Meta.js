import React from 'react';
import Head from 'next/head';
import stylesheet from '../static/css/style.sass';

export default () => (
  <div>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="mask-icon" href="/static/images/website_icon.svg" color="#E53A40" />
      <link rel="shortcut icon" href="/static/images/favicon.png" />
      <link rel="alternate" href="/atom" type="application/atom+xml" title="RSS Feed" />
      <link rel="alternate" href="/feed.json" type="application/json" title="JSON Feed" />
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    </Head>
  </div>
);
