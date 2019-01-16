import React from 'react';
import Link from 'next/link';
import unsplashParams from '../../utils';
import { Post, ImageWrap, Meta, Title, PostDate } from './components';
import { ImageTypes } from '../Header';
import { formatter } from '../../utils/dates';

export type PostTypes = {
  image: ImageTypes;
  id: string;
  date: number;
  title: string;
};

const PostCard = ({ id, image, date, title }: PostTypes) => (
  <Link prefetch href={id} passHref>
    <Post>
      <ImageWrap>
        <img
          src={`/static/images/posts/${image.imageUrl}`}
          alt={
            image.photographer != null ? `Taken by ${image.photographer}` : ''
          }
          data-source-url={unsplashParams(image.url)}
        />
      </ImageWrap>
      <Meta>
        <Title>{title}</Title>
        <PostDate>{formatter.format(date)}</PostDate>
      </Meta>
    </Post>
  </Link>
);

export default PostCard;
