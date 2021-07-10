import * as React from 'react';
import type {
  HeadersFunction,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/node';
import { useRouteData } from '@remix-run/react';
import { differenceInSeconds, parseISO } from 'date-fns';
import { json } from 'remix-utils';

import codeStyles from '../styles/code.css';
import type { BlogPostAndContent } from '../lib/get-posts';
import { getPost } from '../lib/get-posts';
import { formatPostDate } from '../utils/dates';

import FourOhFour from './404';

interface RouteData {
  post?: BlogPostAndContent;
}

interface ErrorWithCode extends Error {
  errno?: number;
  code?: string;
  path?: string;
  syscall?: string;
  stack?: string;
}

const links: LinksFunction = () => [{ rel: 'stylesheet', href: codeStyles }];

const meta: MetaFunction = ({ data }: { data: RouteData }) => ({
  title: data.post
    ? `${data.post.frontmatter.title} • Logan McAnsh`
    : "This post can't be found • Logan McAnsh",
  description: 'My blog!',
});

const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params;

  try {
    const post = await getPost(slug);

    const oneDay = 86400;
    const secondsSincePublished = differenceInSeconds(
      new Date(),
      parseISO(post.frontmatter.date)
    );

    const barelyPublished = secondsSincePublished < oneDay;

    // If this was barely published then only cache it for one minute, giving you
    // a chance to make edits and have them show up within a minute for visitors.
    // But after the first day, then cache for a week, then if you make edits
    // they'll show up eventually, but you don't have to rebuild and redeploy to
    // get them there.
    const maxAge = barelyPublished ? 60 : oneDay * 7;

    // If the max-age has expired, we'll still send the current cached version of
    // the post to visitors until the CDN has cached the new one. If it's been
    // expired for more than one month though (meaning nobody has visited this
    // page for a month) we'll make them wait to see the newest version.
    const swr = oneDay * 30;

    return json<RouteData>(
      { post },
      {
        headers: {
          'Cache-Control': `public, max-age=${maxAge}, stale-while-revalidate=${swr}`,
        },
      }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return json(
        {},
        {
          status: (error as ErrorWithCode).code === 'ENOENT' ? 404 : 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } else {
      console.error(error);
    }

    return json(
      {},
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

const headers: HeadersFunction = ({ loaderHeaders }) => ({
  'cache-control': loaderHeaders.get('cache-control') ?? '',
});

const PostPage: React.VFC = () => {
  const data = useRouteData<RouteData>();

  if (!data.post) {
    return <FourOhFour />;
  }

  return (
    <>
      <div>
        <img
          src={data.post.frontmatter.image.imageUrl}
          alt={data.post.frontmatter.title}
          className="object-cover w-full h-80"
        />
      </div>

      <article className="w-11/12 pt-6 mx-auto space-y-4 max-w-prose sm:w-full">
        <header>
          <div>
            <h1 className="text-3xl font-semibold">
              {data.post.frontmatter.title}
            </h1>
            <span className="text-gray-600">
              Posted on{' '}
              <time dateTime={data.post.frontmatter.date}>
                {formatPostDate(data.post.frontmatter.date)}
              </time>
            </span>
          </div>
        </header>
        <div
          className="prose prose-indigo"
          dangerouslySetInnerHTML={{ __html: data.post.html }}
        />
      </article>
    </>
  );
};

export default PostPage;
export { loader, meta, links, headers };
