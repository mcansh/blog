import React from 'react';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import hydrate from 'next-mdx-remote/hydrate';
import { NextSeo, ArticleJsonLd } from 'next-seo';
import { getBlurhash } from 'next-blurhash';

import { MDXPost, components } from '~/components/layouts/post';
import type { Post } from '~/components/post-card';
import type { RenderToStringOutput } from '~/lib/get-post';
import { getPost, getPostSlugs, renderPostToString } from '~/lib/get-post';
import { name } from '~/utils/author-info';
import { generateOpenGraph } from '~/next-seo.config';
import { getDeploymentURL } from '~/utils/get-deployment-url';
import { getImageUrl } from '~/utils/get-image-url';

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

  const blurHash = await getBlurhash(data.image.imageUrl);

  return {
    props: {
      source: mdxSource,
      frontMatter: {
        ...data,
        image: { ...data.image, blurHash },
        filePath: params.slug,
      } as Post,
      slug: params.slug,
    },
  };
};

const BlogPostPage: NextPage<Props> = ({ frontMatter, source, slug }) => {
  const content = hydrate(source, { components });
  const openGraph = generateOpenGraph(frontMatter);
  const headshot = getImageUrl('/static/images/headshot.jpeg', { w: 1200 });
  return (
    <MDXPost frontMatter={frontMatter}>
      <NextSeo openGraph={openGraph} title={frontMatter.title} />
      <ArticleJsonLd
        url={getDeploymentURL(slug)}
        title={frontMatter.title}
        authorName={name}
        datePublished={frontMatter.date}
        dateModified={frontMatter.lastEdited}
        images={[frontMatter.image.imageUrl]}
        description={frontMatter.title}
        publisherLogo={headshot}
        publisherName={name}
      />
      {content}
    </MDXPost>
  );
};

export default BlogPostPage;
