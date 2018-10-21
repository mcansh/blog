// @flow
import React from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import findPost from '../utils/findPost';
import { description, homepage } from '../package.json';
import { name } from '../utils/authorInfo';
import { YYYYMMDD } from '../utils/Dates';

const suffix = name;
const defaultImage = `${homepage}/static/images/me.jpg`;

type Props = {
  id?: string,
  router: {
    pathname: string,
  },
};

const Meta = ({ id, router }: Props) => {
  const post = findPost(id) || {};
  const { title, image, date } = post;
  const imageFullUrl =
    image &&
    image.imageUrl &&
    `${homepage}/static/images/posts/${image.imageUrl}`;

  const pageTitle = title ? `${title} — ${suffix}` : suffix;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={process.env.TWITTER} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageFullUrl || defaultImage} />

      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta
        property="og:type"
        content={post && title ? 'article' : 'website'}
      />
      <meta property="og:url" content={`${homepage}/${router.pathname}`} />
      <meta property="og:image" content={imageFullUrl || defaultImage} />
      {post && date ? (
        <meta property="article:published_time" content={YYYYMMDD(date)} />
      ) : null}
      {post && title && <meta property="article:author" content={name} />}
    </Head>
  );
};

Meta.defaultProps = {
  id: null,
};

export default withRouter(Meta);
