// @flow
import React from 'react';
import Head from 'next/head';
import { withRouter, type Router } from 'next/router';
import FindPost from '../utils/findPost';
import { description, homepage } from '../package.json';
import { name } from '../utils/authorInfo';
import { YYYYMMDD } from '../utils/Dates';

type Props = {
  id?: string,
  router: Router,
};

const Meta = ({ id, router }: Props) => (
  <FindPost id={id}>
    {post => {
      const pageTitle = post?.title ? `${post.title} — ${name}` : name;
      const fullImageUrl = post?.image?.imageUrl
        ? `${homepage}/static/images/posts/${post.image.imageUrl}`
        : `${homepage}/static/images/me.jpg`;
      return (
        <Head>
          <title>{pageTitle}</title>
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
            content={post?.title ? 'article' : 'website'}
          />
          <meta property="og:url" content={`${homepage}/${router.pathname}`} />
          <meta property="og:image" content={fullImageUrl} />
          {post?.date && (
            <meta
              property="article:published_time"
              content={YYYYMMDD(post.date)}
            />
          )}
          {post?.title && <meta property="article:author" content={name} />}
        </Head>
      );
    }}
  </FindPost>
);

Meta.defaultProps = {
  id: null,
};

export default withRouter(Meta);
