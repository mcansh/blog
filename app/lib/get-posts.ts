import { promises as fs } from 'fs';
import path from 'path';

import matter from 'gray-matter';
import { compareDesc, parseISO } from 'date-fns';
import remark from 'remark';
import html from 'remark-html';
import gatsbyPrism from 'gatsby-remark-prismjs';

export interface FrontMatter {
  title: string;
  date: string;
  image?: {
    imageUrl: string;
    photographer?: string;
    url?: string;
  };
  editUrl: string;
  lastEdited: string;
}

export interface PostFrontMatter {
  name: string;
  frontmatter: FrontMatter;
}

interface Post {
  name: string;
  contents: string;
}

export interface BlogPost {
  name: string;
  html: string;
  frontmatter: FrontMatter;
}

async function getPostsFromFS(): Promise<Array<Post>> {
  const dir = path.join(process.cwd(), '_posts');
  const allFiles = await fs.readdir(dir);
  const files = allFiles.filter(file => !file.startsWith('.'));

  return Promise.all(
    files.map(async file => {
      const contents = await fs.readFile(path.join(dir, file), 'utf-8');
      return { name: file, contents: contents.toString() };
    })
  );
}

async function getPostsFromGitHub(): Promise<Array<Post>> {
  const url = `https://api.github.com/repos/${process.env.REPO}/contents/_posts?ref=${process.env.BRANCH}`;
  const res = await fetch(url);
  const files = (await res.json()) as Array<{
    name: string;
    path: string;
    sha: string;
    size: number;
    url: string;
    html_url: string;
    git_url: string;
    download_url: string;
    type: 'file';
    _links: {
      self: string;
      git: string;
      html: string;
    };
  }>;

  return Promise.all(
    files.map(async ({ name, download_url }) => {
      const contentsRes = await fetch(download_url);
      const contents = await contentsRes.text();
      return { name, contents };
    })
  );
}

async function getPostFromFS(name: string): Promise<string> {
  const dir = path.join(process.cwd(), '_posts');
  const file = await fs.readFile(path.join(dir, `${name}.md`), 'utf-8');
  return file.toString();
}

async function getPostFromGitHub(name: string): Promise<string> {
  const url = `https://raw.githubusercontent.com/${process.env.REPO}/${process.env.BRANCH}/_posts/${name}.md`;
  const res = await fetch(url);
  return res.text();
}

async function getPosts(): Promise<Array<PostFrontMatter>> {
  const files =
    process.env.NODE_ENV === 'production'
      ? await getPostsFromGitHub()
      : await getPostsFromFS();

  return files
    .map(file => {
      const { data } = matter(file.contents);
      return {
        name: file.name.replace(/\.md$/, ''),
        frontmatter: data as FrontMatter,
      };
    })
    .sort((a, b) =>
      compareDesc(parseISO(a.frontmatter.date), parseISO(b.frontmatter.date))
    );
}

async function getPost(name: string): Promise<BlogPost> {
  const contents =
    process.env.NODE_ENV === 'production'
      ? await getPostFromGitHub(name)
      : await getPostFromFS(name);

  const { content, data: frontmatter } = matter(contents);

  const result = await remark()
    .use(() => markdownAST => {
      gatsbyPrism({ markdownAST }, { showLineNumbers: true });
      return markdownAST;
    })
    .use(html)
    .process(content);

  return {
    name,
    html: result.contents.toString(),
    frontmatter: frontmatter as FrontMatter,
  };
}

export { getPost, getPosts };
