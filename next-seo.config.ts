import { DefaultSeoProps } from 'next-seo';
import { OpenGraph } from 'next-seo/lib/types';

import { Post } from './components/post-card';
import { getImageUrl } from './utils/get-image-url';

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
        url: getImageUrl(post.image.imageUrl, { w: 1200 }),
        alt: post.title,
        height: 630,
        width: 1200,
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
      content: '#0448f8',
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'black-translucent',
    },
  ],
  openGraph: {
    images: [
      {
        url: getImageUrl('/static/images/headshot.jpeg', { w: 1200, q: 100 }),
      },
    ],
  },
};

export { defaultSEO, generateOpenGraph };
