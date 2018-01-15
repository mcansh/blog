import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import findPost from '../lib/findPost';
import { description, homepage } from '../package.json';
import { name } from '../lib/authorInfo';

const suffix = name;
const defaultImage = `${homepage}/static/me.png`;

const foundPost = id => {
  if (!id) return { image: {} };
  return findPost(id);
};

const Meta = ({ id }) => {
  const post = foundPost(id);
  const { title, image: { imageUrl } } = post;
  return (
    <Head>
      <title>{title ? `${title} — ${suffix}` : suffix}</title>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={process.env.TWITTER} />
      <meta
        name="twitter:title"
        content={title ? `${title} — ${suffix}` : suffix}
      />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl || defaultImage} />
    </Head>
  );
};

Meta.defaultProps = {
  id: null,
};

Meta.propTypes = {
  id: PropTypes.string,
};

export default Meta;
