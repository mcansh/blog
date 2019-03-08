import React from 'react';
import PostsWrapper from '~/components/posts-wrapper';
import PostCard, { Post } from '~/components/post-card/index';
import Header from '~/components/header/index';
import * as posts from '~/posts';

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
