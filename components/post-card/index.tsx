import React, { useState } from 'react';
import { useAmp } from 'next/amp';
import Link from 'next/link';
import Router from 'next/router';
import { SimpleImg } from 'react-simple-img';
import unsplashParams from '~/utils/unsplashParams.ts';
import Post, { imageHeight } from '~/components/post-card/styles.tsx';
import { ImageType } from '~/components/header/image.tsx';
import { formatPostDate, iso8601 } from '~/utils/dates.ts';
import getCloudinaryURL from '~/utils/getCloudinaryURL.ts';

export interface Post {
  image: ImageType;
  url: string;
  date: number;
  title: string;
}

const PostCard = ({ url, image, date, title }: Post) => {
  const isAmp = useAmp();
  const hasImageAuthor = image.photographer != null;
  const hasImageSrc = image.url != null;
  const image1x = getCloudinaryURL(image.imageUrl, [`h_${imageHeight}`]);
  const image2x = getCloudinaryURL(image.imageUrl, [`h_${imageHeight * 2}`]);
  const image3x = getCloudinaryURL(image.imageUrl, [`h_${imageHeight * 3}`]);
  const [prefetched, setPrefetched] = useState(false);
  return (
    <Link href={{ pathname: url, query: isAmp && { amp: 1 } }} passHref>
      <Post
        onMouseEnter={() => {
          if (!prefetched) {
            Router.prefetch(url);
            setPrefetched(true);
          }
        }}
      >
        <div className="post-card__img-wrapper">
          {isAmp ? (
            <img
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
          ) : (
            <SimpleImg
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
          )}
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
