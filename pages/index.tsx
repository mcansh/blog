import React from 'react';
import PostsWrapper from '~/components/posts-wrapper.tsx';
import PostCard, { Post } from '~/components/post-card/index.tsx';
import Header from '~/components/header/index.tsx';
import * as posts from '~/posts.ts';

const [latest] = posts.sortedByDate;
const { date, ...latestPost } = latest;

const Index = () => (
  <>
    <Header {...latestPost} />
    <PostsWrapper>
      {posts.sortedByDate.map((post: Post) => (
        <PostCard key={post.url} {...post} />
      ))}
    </PostsWrapper>
  </>
);

export default Index;
