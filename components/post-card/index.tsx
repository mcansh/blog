import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlurhashCanvas } from 'react-blurhash';

import unsplashParams from '~/utils/unsplash-params';
import Post from '~/components/post-card/styles';
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
          <BlurhashCanvas
            hash={image.blurHash}
            width={32}
            height={32}
            punch={1}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              height: '100%',
            }}
          />
          <Image
            data-testid="post-image"
            src={image.imageUrl}
            alt={title}
            data-photo={
              hasImageAuthor ? `Taken by ${image.photographer}` : undefined
            }
            data-source-url={
              hasImageSrc ? unsplashParams(image.url) : undefined
            }
            layout="fill"
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
