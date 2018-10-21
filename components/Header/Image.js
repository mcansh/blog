// @flow
import React from 'react';
import styled from 'styled-components';
import webp from '../../utils/webp';
import { unsplashParams } from '../../config';

const Picture = styled.picture`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
  }
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

type Props = {
  image: {
    imageUrl: string,
    name: string,
    url?: string,
  },
};

const HeaderImage = ({ image }: Props) => {
  const imgUrl = `/static/images/posts/${image.imageUrl}`;
  const { url: webpImage, type } = webp(image.imageUrl);

  const webpbg = `/static/images/posts/${webpImage}`;

  return (
    <Picture>
      <source srcSet={webpbg} type="image/webp" />
      <source srcSet={image} type={type} />
      <Image
        src={`/static/images/posts/${image.imageUrl}`}
        alt={image.name ? `Taken by ${image.name}` : ''}
        data-source-url={unsplashParams(imgUrl)}
      />
    </Picture>
  );
};

export default HeaderImage;
