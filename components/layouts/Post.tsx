import React from 'react';
import styled from 'styled-components';
import { MDXProvider } from '@mdx-js/tag';
import Meta from '~/components/Meta';
import Header from '~/components/Header';
import Paragraph from '~/components/Paragraph';
import PostCard, { Post as PostType } from '~/components/PostCard';
import useScrollProgress from '~/components/useScrollProgress';
import * as posts from '~/posts';

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
  console.log(posts.sortedByDate);

  const currentPostIndex = posts.sortedByDate.findIndex(
    post => post.url === url
  );
  const relatedPosts = posts.sortedByDate.slice(
    currentPostIndex + 1,
    currentPostIndex + 4
  );

  const scrollProgress = useScrollProgress();
  return (
    <MDXProvider components={{ p: Paragraph }}>
      <Meta {...meta} />
      <Header {...meta} />
      <ScrollProgress max={100} value={scrollProgress} />
      <PostWrap>{children}</PostWrap>
      {relatedPosts.map(post => (
        <PostCard key={post.url} {...post} />
      ))}
    </MDXProvider>
  );
};

export default Post;
