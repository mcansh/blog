import React from 'react';
import styled from 'styled-components';
import unsplashParams from '../../utils';
import { ImageTypes } from './index';

const ImageWrap = styled.div`
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
  image: ImageTypes;
};

const HeaderImage = ({ image }: Props) => {
  const imagePath = '/static/images/posts';
  const imgUrl = `${imagePath}/${image.imageUrl}`;

  return (
    <ImageWrap>
      <Image
        src={imgUrl}
        alt={image.photographer != null ? `Taken by ${image.photographer}` : ''}
        data-source-url={image.url != null && unsplashParams(image.url)}
      />
    </ImageWrap>
  );
};

export default HeaderImage;
