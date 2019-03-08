import React from 'react';
import styled from 'styled-components';
import unsplashParams from '~/utils/unsplash-params';
import getCloudinaryURL from '~/utils/get-cloudinary-url';

export interface ImageType {
  imageUrl: string;
  photographer?: string | null;
  url?: string | null;
}

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

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

interface Props {
  image: ImageType;
}

const HeaderImage = ({ image }: Props) => {
  const imgUrl = getCloudinaryURL(image.imageUrl);

  return (
    <ImageWrap>
      <img
        src={imgUrl}
        alt={image.photographer ? `Taken by ${image.photographer}` : null}
        data-source-url={image.url && unsplashParams(image.url)}
        data-testid="header_img"
      />
    </ImageWrap>
  );
};

export default HeaderImage;
