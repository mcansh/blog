import { promises as fs } from 'fs';
import path from 'path';

import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import matter from 'gray-matter';

import PostsWrapper from '~/components/posts-wrapper';
import PostCard from '~/components/post-card/index';
import Header from '~/components/header/index';
import { postFilePaths, POSTS_PATH } from '~/utils/mdx';

interface Props {
  posts: {
    content: string;
    data: {
      [key: string]: any;
    };
    filePath: string;
  }[];
  latest: {
    content: string;
    data: {
      [key: string]: any;
    };
    filePath: string;
  };
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await Promise.all(
    postFilePaths.map(async filePath => {
      const source = await fs.readFile(path.join(POSTS_PATH, filePath));
      const { content, data } = matter(source);

      return {
        content,
        data,
        filePath: filePath.replace(/\.mdx?$/, ''),
      };
    })
  );

  const sortedPosts = posts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  return { props: { posts: sortedPosts, latest: sortedPosts[0] } };
};

const Index: NextPage<Props> = ({ latest, posts }) => (
  <>
    <Header
      url={latest.filePath}
      image={latest.data.image}
      title={latest.data.title}
    />
    <PostsWrapper>
      {posts.map(post => (
        <PostCard
          key={post.filePath}
          date={post.data.date}
          image={post.data.image}
          path={post.filePath}
          title={post.data.title}
          editUrl={post.data.editUrl}
        />
      ))}
    </PostsWrapper>
  </>
);

export default Index;
