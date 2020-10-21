import { DefaultSeoProps } from 'next-seo';
import { OpenGraph } from 'next-seo/lib/types';

import { Post } from './components/post-card';
import { getImageUrl } from './utils/get-image-url';
import { colors } from './config';

import pkgJSON from '~/package.json';
import { name } from '~/utils/author-info';
import { getDeploymentURL } from '~/utils/get-deployment-url';

function generateOpenGraph(post: Post): OpenGraph {
  return {
    article: {
      publishedTime: post.date,
      modifiedTime: post.lastEdited,
    },
    images: [
      {
        url: getImageUrl(post.image.imageUrl),
        alt: post.title,
        height: 650,
        width: 850,
      },
    ],
    url: `${getDeploymentURL()}/${post.filePath}`,
    type: 'article',
  };
}

const defaultSEO: DefaultSeoProps = {
  title: 'Home',
  titleTemplate: `%s - ${name}`,
  description: pkgJSON.description,
  twitter: {
    cardType: 'summary',
    site: '@loganmcansh',
    handle: '@loganmcansh',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: `initial-scale=1.0, width=device-width, minimum-scale=1, viewport-fit=cover`,
    },
    {
      name: 'theme-color',
      content: colors.primary,
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black-translucent',
    },
  ],
  openGraph: {
    images: [
      {
        url: getImageUrl('/static/images/headshot.jpg'),
      },
    ],
  },
};

export { defaultSEO, generateOpenGraph };
