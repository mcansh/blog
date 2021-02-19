import * as React from 'react';
import type { LoaderFunction, MetaFunction } from '@remix-run/react';
import { useRouteData } from '@remix-run/react';
import { bundleMDX } from 'mdx-bundler';
import type { PromiseValue } from 'type-fest';
import { MDXProvider } from '@mdx-js/react';
import { getMDXComponent } from 'mdx-bundler/client';
import { format, parseISO } from 'date-fns';

import { getPost } from '../lib/get-post';

import FourOhFour from './404';

interface RouteData {
  post?: PromiseValue<ReturnType<typeof bundleMDX>>;
}

const meta: MetaFunction = ({ data }: { data: RouteData }) => ({
  title: data.post ? data.post.frontmatter.title : 'Logan McAnsh',
  description: 'My blog!',
});

const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params;

  try {
    const { contents } = await getPost(slug);

    const result = await bundleMDX(contents);

    return new Response(JSON.stringify({ post: result }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({}), {
      status: error.code === 'ENOENT' ? 404 : 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
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
  const Component = React.useMemo(() => {
    if (data.post) return getMDXComponent(data.post.code);
    return null;
  }, [data.post]);

  if (!data.post) {
    return <FourOhFour />;
  }

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
