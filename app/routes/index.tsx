import * as React from 'react';
import type {
  HeadersFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/react';
import { useRouteData, Link } from '@remix-run/react';

import type { PostNameAndFrontMatter } from '../lib/get-posts';
import { getPosts } from '../lib/get-posts';
import { formatPostDate, iso8601 } from '../utils/dates';

const headers: HeadersFunction = ({ loaderHeaders }) => ({
  'cache-control': loaderHeaders.get('cache-control'),
});

const meta: MetaFunction = () => ({
  title: 'Logan McAnsh',
  description: 'My neglected blog',
});

interface RouteData {
  posts: Array<PostNameAndFrontMatter>;
  lastPost: PostNameAndFrontMatter;
}

const loader: LoaderFunction = async () => {
  const posts = await getPosts();

  const body = JSON.stringify({
    posts,
    lastPost: posts[0],
  });

  return new Response(body, {
    headers: {
      'cache-control': 'public, max-age=300, stale-while-revalidate=86400',
      'content-type': 'application/json',
    },
  });
};

function Index() {
  const data = useRouteData<RouteData>();
  return (
    <div className="h-full">
      <header className="relative flex items-center justify-center overflow-hidden text-center h-96">
        <div className="relative z-10 space-y-4">
          <h1 className="text-4xl font-semibold text-white">
            {data.lastPost.frontmatter.title}
          </h1>
          <Link
            className="inline-block px-6 py-2 text-base text-white capitalize transition-colors duration-200 ease-in-out bg-indigo-600 border border-gray-500 rounded-lg shadow-lg hover:bg-indigo-400 hover:shadow-sm"
            to={`/blog/${data.lastPost.name}`}
          >
            Read more
          </Link>
        </div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black bg-opacity-60" />
          <img
            src={data.lastPost.frontmatter.image.imageUrl}
            alt={data.lastPost.frontmatter.title}
          />
        </div>
      </header>
      <main className="container py-4 mx-auto">
        <ul className="grid gap-4 px-4 mt-4 sm:px-0 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {data.posts.map(post => (
            <li key={post.name}>
              <div className="flex flex-col">
                <img
                  src={post.frontmatter.image.imageUrl}
                  alt={post.frontmatter.title}
                  className="object-cover w-full h-40 rounded-md"
                  width={1440}
                  height={960}
                />
                <Link
                  className="text-lg text-gray-900"
                  to={`/blog/${post.name}`}
                >
                  {post.frontmatter.title}
                </Link>
                <span className="text-sm text-gray-500">
                  Posted on{' '}
                  <time dateTime={iso8601(post.frontmatter.date)}>
                    {formatPostDate(post.frontmatter.date)}
                  </time>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default Index;
export { loader, meta, headers };
