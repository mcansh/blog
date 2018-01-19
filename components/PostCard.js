import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import Link from 'next/link';
import webp from '../lib/webp';

const PostCard = ({ id, image: { imageUrl, name, url }, date, title }) => (
  <Link prefetch href={id}>
    <a>
      <article className="post" key={id}>
        <picture>
          <source
            srcSet={`/static/images/posts/${webp(imageUrl).url}`}
            type="image/webp"
          />
          <source
            srcSet={`/static/images/posts/${imageUrl}`}
            type={`image/${webp(imageUrl).type}`}
          />
          <img
            src={`/static/images/posts/${imageUrl}`}
            alt={name ? `Taken by ${name}` : ''}
            data-source-url={url || ''}
          />
        </picture>
        <div className="post__meta">
          <p className="date">{format(date, 'MMMM D, YYYY')}</p>
          <h1 className="title">{title}</h1>
        </div>
      </article>
      <style jsx>{`
        article {
          background: white;
          display: inline-block;
          width: calc(33.3333% - 10px);
          height: 400px;
          padding: 0px;
          margin: 0 5px 10px 5px;
          overflow: hidden;
          box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.02);
          vertical-align: top;
          transition: 200ms all ease-in-out;
          line-height: 1.6;
          font-size: 1.6rem;
        }
        @media (max-width: 999px) {
          .post {
            width: calc(50% - 10px);
          }
        }
        @media (max-width: 650px) {
          .post {
            width: 100%;
            margin: 0 0 10px 0;
          }
        }
        @supports (display: grid) {
          .post {
            width: 100%;
            margin: 0;
          }
        }
        .post:hover {
          box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.2);
        }
        a {
          text-decoration: none;
          color: #777;
          font-size: 1em;
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
          padding: 10px 0;
        }

        picture {
          width: 100%;
          height: 50%;
          display: block;
        }
        picture img,
        picture source {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </a>
  </Link>
);

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
