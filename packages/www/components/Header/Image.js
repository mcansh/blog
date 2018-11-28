// @flow
import React from 'react';
import styled from 'styled-components';
import { cloudinary } from '../../config';
import unsplash from '../../utils/unsplash';
import type { ImageType } from '../../types/Post';

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

type Props = {
  ...ImageType,
};

const HeaderImage = ({ imageUrl, name, url }: Props) => {
  const imgUrl = `${cloudinary}/${String(imageUrl)}`;

  return (
    <ImageWrap>
      <img
        src={imgUrl}
        alt={name != null ? `Taken by ${String(name)}` : undefined}
        data-source-url={url != null ? unsplash(String(url)) : undefined}
      />
    </ImageWrap>
  );
};

export default HeaderImage;
