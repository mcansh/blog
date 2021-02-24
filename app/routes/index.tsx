import * as React from 'react';
import type {
  HeadersFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/react';
import { useRouteData, Link } from '@remix-run/react';

import type { PostFrontMatter } from '../lib/get-posts';
import { getPosts } from '../lib/get-posts';
import { formatPostDate, iso8601 } from '../utils/dates';

const headers: HeadersFunction = () => ({
  'cache-control': 'public, max-age=10',
});

const meta: MetaFunction = () => ({
  title: 'Logan McAnsh',
  description: '',
});

interface RouteData {
  posts: Array<PostFrontMatter>;
}

const loader: LoaderFunction = async () => {
  const posts = await getPosts();

  return new Response(JSON.stringify({ posts }), {
    headers: {
      'cache-control': 'public, max-age=300, stale-while-revalidate=86400',
      'content-type': 'application/json',
    },
  });
};

function Index() {
  const data = useRouteData<RouteData>();
  return (
    <div className="container h-full py-4 mx-auto">
      <header className="text-center">
        <h1 className="text-4xl font-semibold">Logan McAnsh</h1>
      </header>
      <main>
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
