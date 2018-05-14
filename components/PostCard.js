import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { FormattedDate } from 'react-intl';
import styled from 'styled-components';
import ProgressiveImage from './ProgressiveImage';
import webp from '../utils/webp';
import { unsplashParams } from '../theme';

const Post = styled.a`
  background: white;
  display: inline-block;
  width: calc(33.3333% - 1rem);
  height: 40rem;
  padding: 0;
  margin: 0 0.5rem 1rem 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 1rem 0.4rem rgba(0, 0, 0, 0.02);
  vertical-align: top;
  transition: 200ms all ease-in-out;
  line-height: 1.6;
  font-size: 1.6rem;
  text-decoration: none;
  color: #555;

  @media (max-width: 999px) {
    width: calc(50% - 1rem);
  }

  @media (max-width: 650px) {
    width: 100%;
    margin: 0 0 1rem 0;
  }

  @supports (display: grid) {
    width: 100%;
    margin: 0;
  }

  &:hover {
    box-shadow: 0 0 1rem 0.4rem rgba(0, 0, 0, 0.2);
  }
`;

const ImageWrap = styled.div`
  height: 50%;
  overflow: hidden;
`;

const Meta = styled.div`
  max-width: 90%;
  margin-left: auto;
  margin-right: auto;
  height: 50%;
`;

export const Title = styled.h1`
  font-weight: inherit;
  font-size: inherit;
  margin: 0;
`;

export const PostDate = styled.p`
  font-weight: inherit;
  font-size: inherit;
  margin: 0;
  padding: 1rem 0;
`;

const PostCard = ({ id, image: { imageUrl, name, url }, date, title }) => {
  const filePath = '/static/images/posts';
  const thumbPath = '/static/images/posts/thumb';
  const webpImage = webp(imageUrl).url;
  const mimeType = `image/${webp(imageUrl).type}`;
  const fileExtension = /[^.]+$/.exec(imageUrl);
  const fileName = imageUrl.replace(`.${fileExtension}`, '');
  const thumbImage = `${fileName}.${fileExtension}`;
  return (
    <Link prefetch href={id} passHref>
      <Post key={id}>
        <ImageWrap>
          <ProgressiveImage
            placeholder={{
              webp: `${thumbPath}/${webpImage}`,
              fallback: `${thumbPath}/${thumbImage}`,
            }}
            source={{
              webp: `${filePath}/${webpImage}`,
              fallback: `${filePath}/${imageUrl}`,
            }}
            mimeType={mimeType}
            alt={name ? `Taken by ${name}` : ''}
            data-source-url={unsplashParams(url)}
          />
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
