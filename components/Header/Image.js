// @flow
import React from 'react';
import styled from 'styled-components';
import webp from '../../utils/webp';
import { unsplashParams } from '../../config';
import type { ImageTypes } from './index';

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
  image: ImageTypes,
};

const HeaderImage = ({ image }: Props) => {
  const imagePath = '/static/images/posts';
  const imgUrl = `${imagePath}/${image.imageUrl}`;
  const { url: webpImage, type } = webp(image.imageUrl);

  const webpbg = `${imagePath}/${webpImage}`;

  return (
    <Picture>
      <source srcSet={webpbg} type="image/webp" />
      <source srcSet={imgUrl} type={type} />
      <Image
        src={imgUrl}
        alt={image.name != null ? `Taken by ${image.name}` : ''}
        data-source-url={image.url != null && unsplashParams(image.url)}
      />
    </Picture>
  );
};

export default HeaderImage;
