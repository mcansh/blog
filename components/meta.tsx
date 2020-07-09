import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { description, homepage } from '~/package.json';
import { name } from '~/utils/author-info';
import { iso8601 } from '~/utils/dates';
import { getImageUrl } from '~/utils/get-image-url';
import { ImageType } from '~/components/header/image';
import { colors, iconSizes } from '~/config';

interface Props {
  title?: string;
  date?: string;
  image?: ImageType;
}

const Meta: React.FC<Props> = ({ title, date, image }) => {
  const router = useRouter();
  const pageTitle = title ? `${title} — ${name}` : name;
  const fullImageUrl = image?.imageUrl
    ? getImageUrl(image.imageUrl)
    : `${homepage}/static/images/headshot.jpg`;

  return (
    <Head>
      <title key="title">{pageTitle}</title>
      <meta charSet="utf-8" />
      <meta key="description" name="description" content={description} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="loganmcansh" />
      <meta key="twitter:title" name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta key="twitter:image" name="twitter:image" content={fullImageUrl} />

      <meta key="og:title" property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta
        key="og:type"
        property="og:type"
        content={title ? 'article' : 'website'}
      />
      <meta
        key="og:url"
        property="og:url"
        content={`${homepage}${router.pathname}`}
      />
      <meta key="og:image" property="og:image" content={fullImageUrl} />
      {date && (
        <meta property="article:published_time" content={iso8601(date)} />
      )}
      {title && <meta property="article:author" content={name} />}
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width, minimum-scale=1, viewport-fit=cover"
      />
      <link rel="manifest" key="manifest" href="/manifest.webmanifest" />
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
      <link rel="shortcut icon" href="/favicon.ico" />
      {iconSizes.map(icon => {
        const size = `${icon}x${icon}`;
        return (
          <link
            key={size}
            rel="apple-touch-icon-precomposed"
            sizes={size}
            href={`/static/images/logo/logo-${icon}.png`}
          />
        );
      })}
      <link
        rel="alternate"
        href={`/atom${process.env.NOW ? '' : '.xml'}`}
        type="application/atom+xml"
        title="RSS Feed"
      />
      <link
        rel="alternate"
        href="/feed.json"
        type="application/json"
        title="JSON Feed"
      />
      <link rel="preconnect" href={process.env.FATHOM_SUBDOMAIN} />
    </Head>
  );
};

export default Meta;
