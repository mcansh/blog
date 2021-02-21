import * as React from 'react';
import type {
  HeadersFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/react';
import { useRouteData, Link } from '@remix-run/react';

import type { PostFrontMatter } from '../lib/get-post';
import { getPosts } from '../lib/get-post';

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
    <div>
      <header>
        <h1>Logan McAnsh</h1>
      </header>
      <main>
        <ul>
          {data.posts.map(post => (
            <li key={post.name}>
              <div>
                <Link to={`/blog/${post.name}`}>{post.frontmatter.title}</Link>
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
