import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import unsplashParams from '~/utils/unsplash-params';
import Post, { imageHeight } from '~/components/post-card/styles';
import { ImageType } from '~/components/header/image';
import { formatPostDate, iso8601 } from '~/utils/dates';
import { widont } from '~/utils/widont';

export interface Post {
  title: string;
  date: string;
  image: ImageType;
  editUrl: string;
  filePath: string;
  lastEdited: string;
}

const PostCard: React.FC<Post> = ({ filePath, image, date, title }) => {
  const hasImageAuthor = image.photographer != null;
  const hasImageSrc = image.url != null;
  return (
    <Link href="/[slug]" as={filePath} passHref>
      <Post>
        <div className="post-card__img-wrapper">
          <Image
            data-testid="post-image"
            height={imageHeight}
            src={image.imageUrl}
            alt={title}
            data-photo={
              hasImageAuthor ? `Taken by ${image.photographer}` : undefined
            }
            data-source-url={
              hasImageSrc ? unsplashParams(image.url) : undefined
            }
            lazy
          />
        </div>
        <div className="post-card__meta">
          <h2 className="post-card__title" data-testid="post-title">
            {widont(title)}
          </h2>
          <time
            className="post-card__date"
            data-testid="post-date"
            dateTime={iso8601(date)}
          >
            {formatPostDate(date)}
          </time>
        </div>
      </Post>
    </Link>
  );
};

export default PostCard;
