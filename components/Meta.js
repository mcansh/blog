import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { withRouter } from 'next/router';
import findPost from '../lib/findPost';
import { description, homepage } from '../package.json';
import { name } from '../lib/authorInfo';
import FormattedDate from '../lib/FormattedDate';

const suffix = name;
const defaultImage = `${homepage}/static/images/me.png`;

const foundPost = id => {
  if (!id) return { image: {} };
  return findPost(id);
};

const Meta = ({ id, router }) => {
  const post = foundPost(id);
  const { title, image: { imageUrl }, date } = post;
  const imageFullUrl =
    imageUrl && `${homepage}/static/images/posts/${imageUrl}`;

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
      {post &&
        date && (
          <meta
            property="article:published_time"
            content={FormattedDate(date)}
          />
        )}
      {post && title && <meta property="article:author" content={name} />}
    </Head>
  );
};

Meta.defaultProps = {
  id: null,
};

Meta.propTypes = {
  id: PropTypes.string,
  router: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default withRouter(Meta);
