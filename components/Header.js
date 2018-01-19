import React from 'react';
import PropTypes from 'prop-types';
import formatDistance from 'date-fns/formatDistance';
import format from 'date-fns/format';
import findPost from '../lib/findPost';
import Button from './Button';
import webp from '../lib/webp';

const PostDate = ({ date }) => {
  const relative =
    formatDistance(Date.now(), date) === 'about 1 month'
      ? 'last month'
      : `${formatDistance(Date.now(), date)} ago`;
  return (
    <h2 title={`Posted ${format(date, 'MMMM D, YYYY')}`}>
      Posted {relative}
      <style jsx>{`
        h2 {
          font-size: 3rem;
        }
      `}</style>
    </h2>
  );
};

PostDate.propTypes = {
  date: PropTypes.number.isRequired,
};

const Header = props => {
  const post = findPost(props.id);
  const { title, date, image: { imageUrl } } = post;
  const fallbackbg = imageUrl
    ? `url(/static/images/posts/${imageUrl})`
    : 'url(/static/images/posts/brevite-434280.jpg)';

  const webpbg = imageUrl
    ? `url(/static/images/posts/${webp(imageUrl).url})`
    : 'url(/static/images/posts/brevite-434280.webp)';

  const background = `${webpbg}, ${fallbackbg}`;
  return (
    <header>
      <div>
        <h1>{props.title || title}</h1>
        {!props.link && date && <PostDate date={date} />}
        {props.link && <Button text="Read More" link={props.id} />}
      </div>
      <style jsx>{`
        header {
          height: 50vh;
          min-height: 500px;
          max-height: 800px;
          background: ${background};
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
};

export default Header;
