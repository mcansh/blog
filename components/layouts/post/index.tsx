import React from 'react';
import styled from 'styled-components';
import { MDXProvider } from '@mdx-js/react';

import Meta from '~/components/meta';
import Header from '~/components/header/index';
import Paragraph from '~/components/paragraph';
import { Post, Post as PostType } from '~/components/post-card/index';
import useScrollProgress from '~/components/use-scroll-progress';
import { Pre, InlineCode } from '~/components/code';
import Link from '~/components/link';

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

interface Props {
  meta: PostType;
}

const components = {
  inlineCode: InlineCode,
  p: Paragraph,
  a: Link,
  pre: Pre,
};

interface MDXPostProps {
  post: PostType;
  frontMatter: Post;
}

const MDXPost: React.FC<MDXPostProps> = ({ children, frontMatter }) => {
  const scrollProgress = useScrollProgress();
  return (
    <MDXProvider components={components}>
      <Meta {...frontMatter} />
      <ScrollProgress value={scrollProgress} />
      <Header {...frontMatter} />
      <PostWrap>{children}</PostWrap>
    </MDXProvider>
  );
};

export default MDXPost;
