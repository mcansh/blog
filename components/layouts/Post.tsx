import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Meta from '../Meta';
import Header from '../Header';
import posts from '../../posts.json';

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
  id: string;
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

const Post = ({ children, ...options }: Props) => {
  const currentPostIndex = posts.findIndex(post => post.id === options.id);
  const previousPost = posts[currentPostIndex - 1];
  const nextPost = posts[currentPostIndex + 1];

  return (
    <>
      <Meta {...options} />
      <Header {...options} />
      <PostWrap>{children}</PostWrap>
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
    </>
  );
};

export default Post;
