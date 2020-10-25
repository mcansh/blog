import { promises as fs } from 'fs';
import path from 'path';

import matter from 'gray-matter';
import { compareDesc } from 'date-fns';
import renderToString from 'next-mdx-remote/render-to-string';

import { postFilePaths, POSTS_PATH } from '~/utils/mdx';
import { components } from '~/components/layouts/post';

export interface Post {
  title: string;
  date: string;
  image: {
    imageUrl: string;
    photographer?: string;
    url?: string;
  };
  editUrl: string;
  lastEdited: string;
}

async function getPost(
  slug: string
): Promise<{
  filePath: string;
  data: Post;
  content: string;
}> {
  const filePath = slug.endsWith('.mdx') ? slug : `${slug}.mdx`;

  const source = await fs.readFile(path.join(POSTS_PATH, filePath), 'utf-8');
  const { content, data } = matter(source);

  return {
    content,
    data: data as Post,
    filePath: filePath.replace(/\.mdx?$/, ''),
  };
}

async function getPosts() {
  const postPromises = postFilePaths.map(filePath => getPost(filePath));

  const posts = await Promise.all(postPromises);

  return posts.sort((a, b) =>
    compareDesc(new Date(a.data.date), new Date(b.data.date))
  );
}

export interface RenderToStringOutput {
  compiledSource: string;
  renderedOutput: string;
  scope: { [key: string]: any };
}

function renderPostToString(
  content: string,
  data: Post
): Promise<RenderToStringOutput> {
  return renderToString(content, {
    components,
    scope: data,
  });
}

// Remove file extensions for page paths
const getPostSlugs = () =>
  postFilePaths.map(file => file.replace(/\.mdx?$/, ''));

export { getPost, getPosts, getPostSlugs, renderPostToString };
