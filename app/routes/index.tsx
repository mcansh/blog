import React from 'react';
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
  title: 'Blog Template',
  description: 'This is a blog template, enjoy!',
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
        <h1>My Neglected Blog</h1>
      </header>
      <main>
        {data.posts.map(post => (
          <p key={post.name}>
            <Link to={post.name}>{post.frontmatter.title}</Link>
          </p>
        ))}
      </main>
    </div>
  );
}

export default Index;
export { loader, meta, headers };
