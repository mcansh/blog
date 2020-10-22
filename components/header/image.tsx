import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

import unsplashParams from '~/utils/unsplash-params';

export interface ImageType {
  imageUrl: string;
  photographer?: string | undefined;
  url?: string | undefined;
}

const ImageWrap = styled.div`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
  }

  /**
    * next/image wraps the image in a number of divs
    * more info: https://github.com/vercel/next.js/blob/7a1bd3d29f84b90ed7f27205ab314ffd844e9ee1/packages/next/client/image.tsx#L271-L272
  */
  div {
    height: 100%;
    width: 100%;
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

const HeaderImage: React.FC<Props> = ({ image }) => (
  <ImageWrap>
    <Image
      src={image.imageUrl}
      alt={image.photographer ? `Taken by ${image.photographer}` : undefined}
      data-source-url={image.url && unsplashParams(image.url)}
      data-testid="header_img"
      unsized
    />
  </ImageWrap>
);

export default HeaderImage;
