import React from 'react';
import styled from 'styled-components';
import { MDXProvider } from '@mdx-js/react';
import Meta from '~/components/meta';
import Header from '~/components/header/index';
import Paragraph from '~/components/paragraph';
import { Post as PostType } from '~/components/post-card/index';
import useScrollProgress from '~/components/use-scroll-progress';

const ScrollProgress = styled.progress`
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
  margin: 3rem auto 0 auto;
  max-width: 90rem;
  width: 95%;
  min-height: calc(100vh - 50rem);
  padding: 0 env(safe-area-inset-right) 0 env(safe-area-inset-left);
  padding: 0 constant(safe-area-inset-right) 0 constant(safe-area-inset-left);
`;

interface Props {
  children: React.ReactNode;
  meta: PostType;
}

const Post = ({ children, meta: { url, ...meta } }: Props) => {
  const scrollProgress = useScrollProgress();
  return (
    <MDXProvider components={{ p: Paragraph }}>
      <Meta {...meta} />
      <Header {...meta} />
      <ScrollProgress max={100} value={scrollProgress} />
      <PostWrap>{children}</PostWrap>
    </MDXProvider>
  );
};

export default Post;
