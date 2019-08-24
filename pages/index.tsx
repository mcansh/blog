import React from 'react';
import PostsWrapper from '~/components/posts-wrapper';
import PostCard, { Post } from '~/components/post-card/index';
import Header from '~/components/header/index';
import posts from '~/data/posts';

export const config = { amp: 'hybrid' };

const [latest] = posts;
const { date, ...latestPost } = latest;

const Index = () => (
  <>
    <Header {...latestPost} />
    <PostsWrapper>
      {posts.map((post: Post) => (
        <PostCard key={post.path} {...post} />
      ))}
    </PostsWrapper>
  </>
);

export default Index;
