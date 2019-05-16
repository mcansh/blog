import React from 'react';
import PostsWrapper from '~/components/posts-wrapper';
import PostCard, { Post } from '~/components/post-card/index';
import Header from '~/components/header/index';
import posts from '~/posts';

// @ts-ignore
const sorted = posts.sort((a, b) => new Date(b.date) - new Date(a.date));

const [latest] = sorted;
const { date, ...latestPost } = latest;

const Index = () => (
  <>
    <Header {...latestPost} />
    <PostsWrapper>
      {sorted.map((post: Post) => (
        <PostCard key={post.url} {...post} />
      ))}
    </PostsWrapper>
  </>
);

export default Index;
