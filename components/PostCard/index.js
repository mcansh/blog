/* eslint-disable global-require, import/no-dynamic-require */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { FormattedDate } from 'react-intl';
import webp from '../../utils/webp';
import { unsplashParams } from '../../config';
import { Post, ImageWrap, Meta, Title, PostDate } from './components';

const PostCard = ({ id, image: { imageUrl, name, url }, date, title }) => {
  const { type, url: webpImage } = webp(imageUrl);

  return (
    <Link prefetch href={id} passHref>
      <Post>
        <ImageWrap>
          <picture>
            <source
              srcSet={`/static/images/posts/${webpImage}`}
              type="image/webp"
            />
            <source srcSet={`/static/images/posts/${imageUrl}`} type={type} />
            <img
              src={`/static/images/posts/${imageUrl}`}
              alt={name ? `Taken by ${name}` : ''}
              data-source-url={unsplashParams(url)}
            />
          </picture>
        </ImageWrap>
        <Meta>
          <Title>{title}</Title>
          <PostDate>
            <FormattedDate
              value={date}
              month="long"
              day="numeric"
              year="numeric"
            />
          </PostDate>
        </Meta>
      </Post>
    </Link>
  );
};

PostCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  image: PropTypes.shape({
    image_url: PropTypes.string,
    name: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

export default PostCard;
