import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const PostCard = props => (
  <article className="post" key={props.href}>
    <Link prefetch href={props.href}>
      <a>
        <div className="post__image--wrapper">
          <div className="post__image" style={{ backgroundImage: `url(/static/images/${props.image})` }} />
        </div>
        <div className="post__meta">
          <p className="date">{props.date}</p>
          <h1 className="title">{props.title}</h1>
        </div>
      </a>
    </Link>
    <style jsx>{`
      .post {
        background: white;
        display: inline-block;
        width: calc(33.3333% - 10px);
        height: 400px;
        padding: 0px;
        margin: 0 5px 10px 5px;
        overflow: hidden;
        box-shadow: 0 0 10px 4px rgba(0,0,0,0.02);
        vertical-align: top;
        transition: 200ms all ease-in-out;
        line-height: 1.6;
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
        box-shadow: 0 0 10px 4px rgba(0,0,0,0.2);
      }

      .post:hover .post__image {
        transform: scale(1.3);
        transition: transform 8s ease-in-out;
      }

      .post__image--wrapper {
        width: 100%;
        height: 50%;
        overflow: hidden;
      }

      .post__image {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        transform: scale(1);
        transition: transform 500ms ease-in-out;
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

      .date, .title {
        font-weight: inherit;
        font-size: inherit;
        margin: 0;
      }

      .date {
        padding: 10px 0;
      }
    `}</style>
  </article>
);

PostCard.propTypes = {
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default PostCard;
