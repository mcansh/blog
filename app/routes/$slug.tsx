import * as React from 'react';
import type { LoaderFunction, MetaFunction } from '@remix-run/react';
import { Link, useRouteData } from '@remix-run/react';
import { bundleMDX } from 'mdx-bundler';
import { MDXProvider } from '@mdx-js/react';
import { getMDXComponent } from 'mdx-bundler/client';
import { format, parseISO } from 'date-fns';

import type { BlogPost } from '../lib/get-post';
import { getPost } from '../lib/get-post';
import { components } from '../components/post';

import FourOhFour from './404';

interface RouteData {
  post?: BlogPost;
}

const meta: MetaFunction = ({ data }: { data: RouteData }) => ({
  title: data.post
    ? `${data.post.frontmatter.title} • Logan McAnsh`
    : "This post can't be found • Logan McAnsh",
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

const PostPage: React.VFC = () => {
  const data = useRouteData<RouteData>();
  // it's generally a good idea to memoize this function call to
  // avoid re-creating the component every render.
  const Component = React.useMemo(() => {
    if (data.post) return getMDXComponent(data.post.code);
    return (null as unknown) as React.FunctionComponent;
  }, [data.post]);

  if (!data.post) {
    return <FourOhFour />;
  }

  return (
    <>
      {data.post.frontmatter.image ? (
        <div>
          <img
            src={data.post.frontmatter.image.imageUrl}
            alt={data.post.frontmatter.title}
            className="object-cover w-full h-80"
          />
        </div>
      ) : (
        <header className="w-11/12 pt-6 mx-auto space-y-4 max-w-prose sm:w-full">
          <Link to="/" className="space-x-2 text-4xl font-medium">
            <span role="img" aria-label="waving hand">
              👋
            </span>
            <span>I&apos;m Logan</span>
          </Link>
        </header>
      )}
      <MDXProvider components={components}>
        <article className="w-11/12 pt-6 mx-auto space-y-4 max-w-prose sm:w-full">
          <header>
            <div>
              <h1 className="text-3xl font-semibold">
                {data.post.frontmatter.title}
              </h1>
              <span className="text-gray-600">
                Posted on{' '}
                <time dateTime={data.post.frontmatter.date}>
                  {format(parseISO(data.post.frontmatter.date), 'MMMM d, yyyy')}
                </time>
              </span>
            </div>
          </header>
          <div>
            <Component />
          </div>
        </article>
      </MDXProvider>
    </>
  );
};

export default PostPage;
export { loader, meta };
