import React from 'react';
import { GetStaticProps, NextPage } from 'next';

import PostCard from '~/components/post-card/index';
import { getPosts, Post } from '~/lib/get-post';

interface Props {
  posts: {
    filePath: string;
    data: Post;
    content: string;
  }[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await getPosts();

  return { props: { posts } };
};

const Index: NextPage<Props> = ({ posts }) => (
  <div className="grid max-w-screen-lg grid-cols-2 px-2 mx-auto gap-x-6 gap-y-10">
    {posts.map((post, index) => (
      <PostCard
        key={post.filePath}
        post={post.data}
        featured={index === 0}
        content={post.content}
        filePath={post.filePath}
      />
    ))}
  </div>
);

export default Index;
