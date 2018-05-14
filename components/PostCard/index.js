/* eslint-disable global-require, import/no-dynamic-require */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { FormattedDate } from 'react-intl';
import webp from '../../utils/webp';
import { unsplashParams } from '../../theme';
import { Post, ImageWrap, Meta, Title, PostDate, Image } from './components';

const PostCard = ({ id, image: { imageUrl, name, url }, date, title }) => {
  const mimeType = `image/${webp(imageUrl).type}`;

  return (
    <Link prefetch href={id} passHref>
      <Post>
        <ImageWrap>
          <picture>
            <source
              srcSet={require(`../../static/images/posts/${imageUrl}`)}
              type="image/webp"
            />
            <source
              srcSet={require(`../../static/images/posts/${imageUrl}`)}
              type={mimeType}
            />
            <Image
              src={require(`../../static/images/posts/${imageUrl}`)}
              alt={name ? `Taken by ${name}` : ''}
              data-source-url={unsplashParams(url)}
            />
          </picture>
        </ImageWrap>
        <Meta>
          <PostDate>
            <FormattedDate
              value={date}
              month="long"
              day="numeric"
              year="numeric"
            />
          </PostDate>
          <Title>{title}</Title>
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
