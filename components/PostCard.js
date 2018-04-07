import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { injectIntl, intlShape } from 'react-intl';
import ProgressiveImage from './ProgressiveImage';
import webp from '../utils/webp';
import { unsplashParams, MMMMDDYYYY } from '../theme';

const PostCard = ({
  id,
  image: { imageUrl, name, url },
  date,
  title,
  intl: { formatDate },
}) => {
  const filePath = '/static/images/posts';
  const thumbPath = '/static/images/posts/thumb';
  const webpImage = webp(imageUrl).url;
  const mimeType = `image/${webp(imageUrl).type}`;
  const fileExtension = /[^.]+$/.exec(imageUrl);
  const fileName = imageUrl.replace(`.${fileExtension}`, '');
  const thumbImage = `${fileName}.${fileExtension}`;
  return (
    <Link prefetch href={id}>
      <a>
        <article className="post" key={id}>
          <div className="post__image">
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
          </div>
          <div className="post__meta">
            <p className="date">{formatDate(date, MMMMDDYYYY)}</p>
            <h1 className="title">{title}</h1>
          </div>
        </article>
        <style jsx>{`
          article {
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
          }

          @media (max-width: 999px) {
            .post {
              width: calc(50% - 1rem);
            }
          }

          @media (max-width: 650px) {
            .post {
              width: 100%;
              margin: 0 0 1rem 0;
            }
          }

          @supports (display: grid) {
            .post {
              width: 100%;
              margin: 0;
            }
          }

          .post:hover {
            box-shadow: 0 0 1rem 0.4rem rgba(0, 0, 0, 0.2);
          }

          a {
            text-decoration: none;
            color: #777;
            font-size: 1rem;
          }

          .post__meta {
            max-width: 90%;
            margin-left: auto;
            margin-right: auto;
            height: 50%;
          }

          .date,
          .title {
            font-weight: inherit;
            font-size: inherit;
            margin: 0;
          }

          .date {
            padding: 1rem 0;
          }

          .post__image {
            height: 50%;
            overflow: hidden;
          }
        `}</style>
      </a>
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
  intl: intlShape.isRequired,
};

export default injectIntl(PostCard);
