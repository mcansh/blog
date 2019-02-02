import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { MDXProvider } from '@mdx-js/tag';
import Meta from '~/components/Meta';
import Header from '~/components/Header';
import posts from '~/posts';
import Paragraph from '~/components/Paragraph';
import { Post as PostType } from '~/components/PostCard';
import useScrollProgress from '~/components/useScrollProgress';

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

const ReadOtherPosts = styled.div`
  max-width: 90rem;
  width: 95%;
  margin: 0 auto;
  ul {
    padding: 0;
    list-style: none;
    font-size: 2rem;
  }
  li {
    margin: 1rem;
  }
`;

const Post = ({ children, meta: { url, ...meta } }: Props) => {
  // for whatever reason the current post is always undefined in the `posts` array
  const currentPostIndex = posts.findIndex(post => post === undefined);
  const previousPost = posts[currentPostIndex - 1];
  const nextPost = posts[currentPostIndex + 1];
  const scrollProgress = useScrollProgress();

  return (
    <MDXProvider components={{ p: Paragraph }}>
      <Meta {...meta} />
      <Header {...meta} />
      <PostWrap>{children}</PostWrap>
      <ScrollProgress max={100} value={scrollProgress} />
      <ReadOtherPosts>
        <ul>
          {previousPost && (
            <li>
              <Link href={`/${previousPost.id}`} prefetch>
                <a>&#x2190; {previousPost.title}</a>
              </Link>
            </li>
          )}
          {nextPost && (
            <li>
              <Link href={`/${nextPost.id}`} prefetch>
                <a>{nextPost.title} &rarr;</a>
              </Link>
            </li>
          )}
        </ul>
      </ReadOtherPosts>
    </MDXProvider>
  );
};

export default Post;
