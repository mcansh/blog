import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import findPost from '../lib/findPost';
import Button from './Button';

const image = (supportsWebp, imageUrl) => {
  const imageRegex = /png|jpg/;
  const imageWebp = imageUrl.replace(imageRegex, 'webp');
  if (imageUrl && supportsWebp) {
    return `/static/images/posts/webp/${imageWebp}`;
  } else if (imageUrl && !supportsWebp) {
    return `/static/images/posts/${imageUrl}`;
  }
  return '/static/images/posts/brevite-434280.jpg';
};

const Header = props => {
  const post = findPost(props.id);
  const { title, date, image: { imageUrl } } = post;
  return (
    <header>
      <div>
        <h1>{props.title || title}</h1>
        {!props.link && date && <h2>{format(date, 'MMMM DD, YYYY')}</h2>}
        {props.link && <Button text="Read More" link={props.id} />}
      </div>
      <style jsx>{`
        header {
          height: 50vh;
          min-height: 500px;
          max-height: 800px;
          background: ${`url(${image(props.supportsWebp, imageUrl)})`};
          background-size: cover;
          background-position: center;

          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          position: relative;
        }

        header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
        }

        div {
          z-index: 1;
          text-align: center;
          max-width: 80vw;
        }

        h1 {
          font-size: 5rem;
          margin-bottom: 2rem;
        }

        h2 {
          font-size: 3rem;
        }
      `}</style>
    </header>
  );
};

Header.defaultProps = {
  link: null,
  id: null,
  title: null,
};

Header.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
  id: PropTypes.string,
  supportsWebp: PropTypes.bool.isRequired,
};

export default Header;
