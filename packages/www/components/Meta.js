// @flow
import React from 'react';
import Head from 'next/head';
import { withRouter, type Router } from 'next/router';
import { colors, cloudinary } from '../config';
import FindPost from '../utils/FindPost';
import { description as defaultDescription } from '../package.json';
import formatDate from '../utils/dates';

type Props = {
  pageTitle?: string,
  id?: string,
  router: Router,
  description?: string,
};

const Meta = ({ pageTitle, description, id, router }: Props) => (
  <FindPost id={id}>
    {post => {
      const fullImageUrl =
        post && post.image.imageUrl
          ? `${cloudinary}/${post.image.imageUrl}`
          : `${cloudinary}/me.jpg`;
      return (
        <Head>
          <title>{post ? post.title : pageTitle}</title>
          <meta name="description" content={description} />
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width, viewport-fit=cover"
          />
          <link rel="manifest" href="/manifest.json" />
          <link type="text/plain" rel="author" href="/static/humans.txt" />
          <link
            rel="mask-icon"
            href="/static/images/logo/safari.svg"
            color={colors.primary}
          />
          <meta name="theme-color" content={colors.primary} />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
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

          <meta name="description" content={description} />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="loganmcansh" />
          <meta name="twitter:title" content={pageTitle} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={fullImageUrl} />

          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={description} />
          <meta
            property="og:type"
            content={post && post.title ? 'article' : 'website'}
          />
          <meta
            property="og:url"
            content={`https://mcansh.blog/${router.pathname}`}
          />
          <meta property="og:image" content={fullImageUrl} />
          {post && post.date && (
            <meta
              property="article:published_time"
              content={formatDate(post.date)}
            />
          )}
          {post && post.title && (
            <meta property="article:author" content="Logan McAnsh" />
          )}
        </Head>
      );
    }}
  </FindPost>
);

Meta.defaultProps = {
  pageTitle: 'Logan McAnsh',
  description: defaultDescription,
  id: null,
};

export default withRouter(Meta);
