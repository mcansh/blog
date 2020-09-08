import React from 'react';
import Link from 'next/link';
import { SimpleImg } from 'react-simple-img';

import unsplashParams from '~/utils/unsplash-params';
import Post, { imageHeight } from '~/components/post-card/styles';
import { ImageType } from '~/components/header/image';
import { formatPostDate, iso8601 } from '~/utils/dates';
import { getImageUrl } from '~/utils/get-image-url';
import { widont } from '~/utils/widont';

export interface Post {
  title: string;
  date: string;
  image: ImageType;
  editUrl: string;
  filePath: string;
  lastEdited?: string;
}

const PostCard: React.FC<Post> = ({ filePath, image, date, title }) => {
  const hasImageAuthor = image.photographer != null;
  const hasImageSrc = image.url != null;
  const image1x = getImageUrl(image.imageUrl, { h: imageHeight });
  const image2x = getImageUrl(image.imageUrl, { h: imageHeight * 2 });
  const image3x = getImageUrl(image.imageUrl, { h: imageHeight * 3 });
  return (
    <Link href="/[slug]" as={filePath} passHref>
      <Post>
        <div className="post-card__img-wrapper">
          <SimpleImg
            data-testid="post-image"
            placeholder={false}
            height={200}
            src={image1x}
            alt={title}
            srcSet={`${image1x} 1x, ${image2x} 2x, ${image3x} 3x`}
            data-photo={
              hasImageAuthor ? `Taken by ${image.photographer}` : undefined
            }
            data-source-url={
              hasImageSrc ? unsplashParams(image.url) : undefined
            }
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
