import path from 'path';
import { promises as fs } from 'fs';

import React from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import matter from 'gray-matter';
import hydrate from 'next-mdx-remote/hydrate';
import renderToString from 'next-mdx-remote/render-to-string';

import { postFilePaths, POSTS_PATH } from '~/utils/mdx';
import { MDXPost, components } from '~/components/layouts/post';
import { Post } from '~/components/post-card';

interface Props {
  source: any;
  frontMatter: Post;
}

type Params = {
  slug: string;
};

export const getStaticPaths: GetStaticPaths<Params> = () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map(file => file.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map(slug => ({ params: { slug } }));

  return Promise.resolve({
    fallback: false,
    paths,
  });
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params = {},
}) => {
  const filePath = path.join(POSTS_PATH, `${params.slug}.mdx`);
  const source = await fs.readFile(filePath, 'utf-8');
  const { data, content } = matter(source);

  const mdxSource = await renderToString(content, {
    components,
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data as Post,
    },
  };
};

const BlogPostPage: NextPage<Props> = ({ frontMatter, source }) => {
  const content = hydrate(source, { components });

  return <MDXPost frontMatter={frontMatter}>{content}</MDXPost>;
};

export default BlogPostPage;