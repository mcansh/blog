import React from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import hydrate from 'next-mdx-remote/hydrate';

import { MDXPost, components } from '~/components/layouts/post';
import { Post } from '~/components/post-card';
import {
  getPost,
  getPostSlugs,
  renderPostToString,
  RenderToStringOutput,
} from '~/lib/get-post';

type Params = {
  slug: string;
};

export type Props = Params & {
  source: RenderToStringOutput;
  frontMatter: Post;
};

export const getStaticPaths: GetStaticPaths<Params> = () => {
  const slugs = getPostSlugs();

  // Map the path into the static paths object required by Next.js
  const paths = slugs.map(slug => ({ params: { slug } }));

  return Promise.resolve({
    fallback: false,
    paths,
  });
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  if (!params) {
    throw new Error(
      "This is _impossible_ due to returning params in `getStaticPaths`, but somehow we didn't get them"
    );
  }

  const { content, data } = await getPost(params.slug);

  const mdxSource = await renderPostToString(content, data);

  return {
    props: {
      source: mdxSource,
      frontMatter: data as Post,
      slug: params.slug,
    },
  };
};

const BlogPostPage: NextPage<Props> = ({ frontMatter, source, slug }) => {
  const content = hydrate(source, { components });
  return (
    <MDXPost slug={slug} frontMatter={frontMatter}>
      {content}
    </MDXPost>
  );
};

export default BlogPostPage;
