import React, { useState } from 'react';
import { useAmp } from 'next/amp';
import Link from 'next/link';
import Router from 'next/router';
import { SimpleImg } from 'react-simple-img';
import unsplashParams from '~/utils/unsplash-params';
import Post from '~/components/post-card/styles';
import { ImageType } from '~/components/header/image';
import { formatPostDate, iso8601 } from '~/utils/dates';

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
  // const image1x = getCloudinaryURL(image.imageUrl, [`h_${imageHeight}`]);
  // const image2x = getCloudinaryURL(image.imageUrl, [`h_${imageHeight * 2}`]);
  // const image3x = getCloudinaryURL(image.imageUrl, [`h_${imageHeight * 3}`]);
  const [prefetched, setPrefetched] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const webp = require(`../../static/images/posts/${image.imageUrl}?webp`);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const img = require(`../../static/images/posts/${image.imageUrl}?trace`);

  return (
    <Link href={{ pathname: url, query: isAmp && { amp: 1 } }} passHref>
      <Post
        onMouseEnter={() => {
          /* istanbul ignore next */
          if (!prefetched) {
            Router.prefetch(url);
            setPrefetched(true);
          }
        }}
      >
        <div className="post-card__img-wrapper">
          <picture>
            <source srcSet={webp} type="image/webp" />
            <source srcSet={img.src} type="image/jpeg" />
            <SimpleImg
              data-testid="post-image"
              placeholder={img.trace}
              height={200}
              src={img.src}
              alt={title}
              // srcSet={`${image1x} 1x, ${image2x} 2x, ${image3x} 3x`}
              data-photo={
                hasImageAuthor ? `Taken by ${image.photographer}` : undefined
              }
              data-source-url={
                hasImageSrc ? unsplashParams(image.url) : undefined
              }
            />
          </picture>
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
