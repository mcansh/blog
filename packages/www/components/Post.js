// @flow
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import unsplash from '../utils/unsplash';
import { type PostType } from '../types/Post';

const imageHeight = 200;

const PostStyles = styled.a`
  background: white;
  width: calc(33.3333% - 2rem);
  padding: 0;
  margin: 0 1rem 2rem 1rem;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0.3rem 0.8rem 0;
  transition: all 200ms ease;
  text-decoration: none;
  color: #262626;
  position: relative;
  border-radius: 0.5rem;
  cursor: pointer;

  @media (max-width: 999px) {
    width: calc(50% - 2rem);
  }

  @media (max-width: 650px) {
    width: 100%;
    margin: 0 0 2rem 0;
  }

  @supports (display: grid) {
    width: 100%;
    margin: 0;
  }

  h1 {
    font-weight: 700;
    font-size: 2.2rem;
    color: #262626;
    margin-bottom: 1.1rem;
  }

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.15) 0 0.8rem 2.4rem 0;
    h1 {
      text-decoration: underline;
    }
  }

  img {
    width: 100%;
    height: ${imageHeight}px;
    object-fit: cover;
  }

  .meta {
    padding: 1.8rem 1rem 2.7rem;
  }

  time {
    display: block;
    font-weight: 400;
    color: #666666;
    font-size: 1.62rem;
  }
`;

const dateFormatter = new Intl.DateTimeFormat('default', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

const getCloudinaryURL = (image, settings: string[]) => {
  const base = 'https://res.cloudinary.com/dof0zryca/image/upload';
  const id = 'v1541889199/blog';
  const settingsString = ['f_auto', ...settings].join(',');

  return `${base}/${settingsString}/${id}/${image}`;
};

const Post = ({ title, date, image, id }: PostType) => {
  const hasImageAuthor = image.name != null;
  const hasImageSrc = image.url != null;

  const image1x = getCloudinaryURL(image.imageUrl, [`h_${imageHeight}`]);
  const image2x = getCloudinaryURL(image.imageUrl, [`h_${imageHeight * 2}`]);
  const image3x = getCloudinaryURL(image.imageUrl, [`h_${imageHeight * 3}`]);
  return (
    <Link href={`/${id}`} passHref prefetch>
      <PostStyles>
        <img
          src={image1x}
          srcSet={`${image1x} 1x, ${image2x} 2x, ${image3x} 3x`}
          alt={title}
          data-unsplash-photo={
            hasImageAuthor ? `Taken by ${String(image.name)}` : undefined
          }
          data-image-url={hasImageSrc ? unsplash(String(image.url)) : undefined}
        />
        <div className="meta">
          <h1>{title}</h1>
          <time dateTime={date}>{dateFormatter.format(new Date(date))}</time>
        </div>
      </PostStyles>
    </Link>
  );
};

export default Post;
