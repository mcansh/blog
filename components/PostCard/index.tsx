import React, { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import unsplashParams from '~/utils/unsplashParams';
import {
  Post,
  ImageWrap,
  Meta,
  Title,
  PostDate,
  imageHeight,
} from '~/components/PostCard/components';
import { ImageType } from '~/components/Header/Image';
import { formatter } from '~/utils/dates';
import getCloudinaryURL from '~/utils/getCloudinaryURL';

export interface Post {
  image: ImageType;
  url: string;
  date: number;
  title: string;
}

const PostCard = ({ url, image, date, title }: Post) => {
  const hasImageAuthor = image.photographer != null;
  const hasImageSrc = image.url != null;
  const image1x = getCloudinaryURL(image.imageUrl, [`h_${imageHeight}`]);
  const image2x = getCloudinaryURL(image.imageUrl, [`h_${imageHeight * 2}`]);
  const image3x = getCloudinaryURL(image.imageUrl, [`h_${imageHeight * 3}`]);
  const [prefetched, setPrefetched] = useState(false);
  return (
    <Link href={url} passHref>
      <Post
        onMouseEnter={() => {
          if (!prefetched) {
            Router.prefetch(url);
            setPrefetched(true);
          }
        }}
      >
        <ImageWrap>
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
        </ImageWrap>
        <Meta>
          <Title>{title}</Title>
          <PostDate>{formatter.format(date)}</PostDate>
        </Meta>
      </Post>
    </Link>
  );
};

export default PostCard;
