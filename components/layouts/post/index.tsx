import React from 'react';
import styled from 'styled-components';
import { ArticleJsonLd, NextSeo } from 'next-seo';

import Header from '~/components/header/index';
import Paragraph from '~/components/paragraph';
import { Post as PostType } from '~/components/post-card/index';
import useScrollProgress from '~/components/use-scroll-progress';
import { Pre, InlineCode } from '~/components/code';
import Link from '~/components/link';
import { generateOpenGraph } from '~/next-seo.config';
import { getDeploymentURL } from '~/utils/get-deployment-url';
import { name } from '~/utils/author-info';
import { getImageUrl } from '~/utils/get-image-url';

const ScrollProgress = styled.progress.attrs({ max: 100, min: 0 })`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  height: 3px;
  appearance: none;
  border: none;
  background: none;

  &::-webkit-progress-bar {
    background-color: transparent;
  }

  &::-webkit-progress-value {
    background-image: linear-gradient(135deg, #7fdbca 0%, #82aaff 100%);
  }

  &::-moz-progress-bar {
    background-image: linear-gradient(135deg, #7fdbca 0%, #82aaff 100%);
  }
`;

const PostWrap = styled.div`
  margin: 3rem auto 0;
  max-width: 90rem;
  width: 95%;
  padding: 0 env(safe-area-inset-right) 0 env(safe-area-inset-left);
  padding: 0 constant(safe-area-inset-right) 0 constant(safe-area-inset-left);
`;

const components = {
  inlineCode: InlineCode,
  p: Paragraph,
  a: Link,
  pre: Pre,
};

interface MDXPostProps {
  frontMatter: PostType;
  slug: string;
}

const MDXPost: React.FC<MDXPostProps> = ({ children, frontMatter, slug }) => {
  const scrollProgress = useScrollProgress();
  const seo = React.useMemo(() => generateOpenGraph(frontMatter), [
    frontMatter,
  ]);

  const headshot = React.useMemo(
    () => getImageUrl('/static/images/headhsot.jpg'),
    []
  );

  return (
    <>
      <NextSeo {...seo} />
      <ArticleJsonLd
        url={getDeploymentURL(slug)}
        title={frontMatter.title}
        authorName={name}
        datePublished={frontMatter.date}
        dateModified={frontMatter.lastEdited}
        images={[frontMatter.image.imageUrl]}
        description={frontMatter.title}
        publisherLogo={headshot}
        publisherName={name}
      />
      <ScrollProgress value={scrollProgress} />
      <Header {...frontMatter} />
      <PostWrap>{children}</PostWrap>
    </>
  );
};

export { MDXPost, components };
