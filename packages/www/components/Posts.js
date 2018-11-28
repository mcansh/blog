// @flow
import React from 'react';
import styled from 'styled-components';
import Post from './Post';
import { type PostType } from '../types/Post';

const PostsWrapperStyles = styled.div`
  margin: 0 auto;
  width: 95%;
  padding-top: 9rem;
  display: flex;
  flex-flow: row wrap;

  @supports (display: grid) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
    grid-gap: 3.6rem;
  }

  @media (min-width: 768px) {
    max-width: 750px;
    width: auto;
  }
  @media (min-width: 992px) {
    max-width: 970px;
    width: auto;
  }
  @media (min-width: 1200px) {
    max-width: 1170px;
    width: auto;
  }
`;

type Props = {
  posts: PostType[],
};

const PostsWrapper = ({ posts }: Props) => (
  <PostsWrapperStyles>
    {posts.map(post => (
      <Post
        key={post.id}
        id={post.id}
        date={post.date}
        title={post.title}
        image={post.image}
      />
    ))}
  </PostsWrapperStyles>
);

export default PostsWrapper;
