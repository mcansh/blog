import React from 'react';
import Head from 'next/head';
import { withRouter, RouterProps } from 'next/router';
import { description, homepage } from '../package.json';
import { name } from '../utils/authorInfo';
import iso8601 from '../utils/dates';
import getCloudinaryURL from '../utils/getCloudinaryURL';
import { ImageType } from './header/image';

interface Props {
  title?: string;
  date?: number;
  image?: ImageType;
  router: RouterProps;
}

const Meta = ({ title, date, image, router }: Props) => {
  const pageTitle = title ? `${title} — ${name}` : name;
  const fullImageUrl =
    image && image.imageUrl
      ? getCloudinaryURL(image.imageUrl)
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
      <meta property="og:type" content={title ? 'article' : 'website'} />
      <meta property="og:url" content={`${homepage}/${router.pathname}`} />
      <meta property="og:image" content={fullImageUrl} />
      {date && (
        <meta property="article:published_time" content={iso8601(date)} />
      )}
      {title && <meta property="article:author" content={name} />}
    </Head>
  );
};

Meta.defaultProps = {
  title: null,
  date: null,
  image: null,
};

export default withRouter(Meta);
