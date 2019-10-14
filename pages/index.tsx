import React from 'react';

import PostsWrapper from '~/components/posts-wrapper';
import PostCard, { Post } from '~/components/post-card/index';
import Header from '~/components/header/index';
import posts from '~/data/posts';

export const config = { amp: 'hybrid' };

const [latest] = posts;

const Index = () => (
  <>
    <Header url={latest.path} image={latest.image} title={latest.title} />
    <PostsWrapper>
      {posts.map((post: Post) => (
        <PostCard key={post.path} {...post} />
      ))}
    </PostsWrapper>
  </>
);

export default Index;
