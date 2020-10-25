import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import unsplashParams from '~/utils/unsplash-params';
import { formatPostDate, iso8601 } from '~/utils/dates';
import { widont } from '~/utils/widont';
import { Post } from '~/lib/get-post';

export interface PostProps {
  filePath: string;
  post: Post;
  content: string;
  featured?: boolean;
}

const PostCard: React.VFC<PostProps> = ({
  post: { image, date, title },
  filePath,
  featured,
}) => {
  const hasImageAuthor = image.photographer != null;
  const hasImageSrc = image.url != null;
  const photoProps = {
    'data-photo': hasImageAuthor ? `Taken by ${image.photographer}` : undefined,
    'data-source-url': hasImageSrc ? unsplashParams(image.url) : undefined,
  };

  return (
    <Link href={filePath}>
      <a
        className={`space-y-2 ${
          featured ? 'md:w-full md:space-x-6 lg:col-span-2 md:flex' : ''
        }`}
      >
        <div>
          <Image
            src={image.imageUrl}
            alt={title}
            height={featured ? 400 : 333}
            width={featured ? 600 : 500}
            className="rounded-lg"
            {...photoProps}
          />
        </div>
        <div>
          <time className="text-gray-500" dateTime={iso8601(date)}>
            {formatPostDate(date)}
          </time>
          <h2 className="text-xl font-semibold text-gray-700 md:text-3xl">
            {widont(title)}
          </h2>
        </div>
      </a>
    </Link>
  );
};

export default PostCard;
