import React from 'react';
import type { GetStaticProps, NextPage } from 'next';
import { getImage } from '@plaiceholder/next';
import { getBlurhash } from '@plaiceholder/blurhash';

import PostsWrapper from '~/components/posts-wrapper';
import type { Post } from '~/components/post-card/index';
import PostCard from '~/components/post-card/index';
import Header from '~/components/header/index';
import { getPosts } from '~/lib/get-post';

interface Props {
  posts: {
    content: string;
    data: Post;
    filePath: string;
  }[];
  latest: {
    content: string;
    data: Post;
    filePath: string;
  };
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts();

  const postsWithBlurHash = await Promise.all(
    posts.map(async post => {
      const imageBuffer = await getImage(post.data.image.imageUrl);
      const blurHash = await getBlurhash(imageBuffer);
      return {
        ...post,
        data: {
          ...post.data,
          image: {
            ...post.data.image,
            blurHash: blurHash.hash,
          },
        },
      };
    })
  );

  return { props: { posts: postsWithBlurHash, latest: postsWithBlurHash[0] } };
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
          filePath={post.filePath}
          title={post.data.title}
          editUrl={post.data.editUrl}
          lastEdited={post.data.lastEdited}
        />
      ))}
    </PostsWrapper>
  </>
);

export default Index;
