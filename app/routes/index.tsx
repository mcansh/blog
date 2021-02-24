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
    <div className="h-full py-4 mx-auto max-w-prose">
      <header className="text-center">
        <h1 className="text-4xl font-semibold">Logan McAnsh</h1>
      </header>
      <main>
        <ul className="space-y-4">
          {data.posts.map(post => (
            <li key={post.name}>
              <div className="flex flex-col">
                <Link to={`/blog/${post.name}`}>{post.frontmatter.title}</Link>
                <span>
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
