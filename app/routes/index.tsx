import { promises as fs } from 'fs';
import path from 'path';

import * as React from 'react';
import type { LoaderFunction, MetaFunction } from '@remix-run/react';
import { useRouteData } from '@remix-run/react';
import { bundleMDX } from 'mdx-bundler';
import type { PromiseValue } from 'type-fest';
import { MDXProvider } from '@mdx-js/react';
import { getMDXComponent } from 'mdx-bundler/client';
import { format, parseISO } from 'date-fns';

interface RouteData {
  post: PromiseValue<ReturnType<typeof bundleMDX>>;
}

const meta: MetaFunction = () => ({
  title: 'Logan McAnsh',
  description: 'My blog!',
});

const loader: LoaderFunction = async () => {
  const post = await fs.readFile(
    path.join(process.cwd(), '_posts/html5-progress-element.mdx'),
    'utf-8'
  );

  const result = await bundleMDX(post);

  return new Response(JSON.stringify({ post: result }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const Heading: React.FC = ({ children, ...props }) => (
  <h2 className="text-xl font-semibold" {...props}>
    {children}
  </h2>
);

function IndexPage() {
  const data = useRouteData<RouteData>();
  // it's generally a good idea to memoize this function call to
  // avoid re-creating the component every render.
  const Component = React.useMemo(() => getMDXComponent(data.post.code), [
    data.post.code,
  ]);

  return (
    <MDXProvider
      components={{
        h2: Heading,
      }}
    >
      <header className="relative flex items-center justify-center h-80">
        <div className="z-10 text-white">
          <h1 className="text-3xl font-semibold">
            {data.post.frontmatter.title}
          </h1>
          <time dateTime={data.post.frontmatter.date}>
            {format(parseISO(data.post.frontmatter.date), 'MMMM d, yyyy')}
          </time>
        </div>
        <img
          src={data.post.frontmatter.image.imageUrl}
          alt={data.post.frontmatter.title}
          className="absolute inset-0 object-cover w-full h-full"
        />
      </header>
      <main className="mx-auto max-w-prose">
        <Component />
      </main>
    </MDXProvider>
  );
}

export default IndexPage;
export { loader, meta };
