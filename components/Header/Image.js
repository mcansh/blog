import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import webp from '../../utils/webp';
import { unsplashParams } from '../../theme';

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

const HeaderImage = ({ image: { imageUrl, name, url } }) => {
  const image = `/static/images/posts/${imageUrl}`;

  const webpbg = `/static/images/posts/${webp(imageUrl).url}`;
  const mimetype = `image/${webp(imageUrl).type}`;

  return (
    <Picture>
      <source srcSet={webpbg} type="image/webp" />
      <source srcSet={image} type={mimetype} />
      <Image
        src={`/static/images/posts/${imageUrl}`}
        alt={name ? `Taken by ${name}` : ''}
        data-source-url={unsplashParams(url)}
      />
    </Picture>
  );
};

HeaderImage.propTypes = {
  image: PropTypes.shape({
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

export default HeaderImage;
