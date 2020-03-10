import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { SimpleImg } from 'react-simple-img';

import unsplashParams from '~/utils/unsplash-params';
import Post, { imageHeight } from '~/components/post-card/styles';
import { ImageType } from '~/components/header/image';
import { formatPostDate, iso8601 } from '~/utils/dates';
import getCloudinaryURL from '~/utils/get-cloudinary-url';

export interface Post {
  title: string;
  date: string;
  image: ImageType;
  editUrl: string;
  path: string;
  lastEdited?: string;
}

const PostCard: React.FC<Post> = ({ path, image, date, title }) => {
  const { query } = useRouter();

  const hasImageAuthor = image.photographer != null;
  const hasImageSrc = image.url != null;
  const image1x = getCloudinaryURL(image.imageUrl, [`h_${imageHeight}`]);
  const image2x = getCloudinaryURL(image.imageUrl, [`h_${imageHeight * 2}`]);
  const image3x = getCloudinaryURL(image.imageUrl, [`h_${imageHeight * 3}`]);
  return (
    <Link href={{ pathname: path, query }} passHref>
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
            {title}
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
