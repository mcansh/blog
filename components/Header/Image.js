import React from 'react';
import PropTypes from 'prop-types';
import webp from '../../lib/webp';
import { unsplashParams } from '../../theme';

const HeaderImage = ({ post: { image: { imageUrl, name, url } } }) => {
  const image = `/static/images/posts/${imageUrl}`;

  const webpbg = `/static/images/posts/${webp(imageUrl).url}`;

  return (
    <picture>
      <source srcSet={webpbg} type="image/webp" />
      <source srcSet={image} type={`image/${webp(imageUrl).type}`} />
      <img
        src={`/static/images/posts/${imageUrl}`}
        alt={name ? `Taken by ${name}` : ''}
        data-source-url={unsplashParams(url)}
      />
      <style jsx>{`
        picture {
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
        }

        picture::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
        }

        source,
        img {
          height: 100%;
          width: 100%;
          object-fit: cover;
        }
      `}</style>
    </picture>
  );
};

HeaderImage.propTypes = {
  post: PropTypes.shape({
    image: PropTypes.shape({
      imageUrl: PropTypes.string,
      name: PropTypes.string,
      url: PropTypes.string,
    }),
  }).isRequired,
};

export default HeaderImage;
