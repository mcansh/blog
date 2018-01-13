import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedRelative } from 'react-intl';
import findPost from '../lib/findPost';
import Button from './Button';
import webp from '../lib/webp';

const PostDate = ({ date, intl: { formatDate } }) => (
  <h2
    title={formatDate(date, {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })}
  >
    Posted <FormattedRelative value={date} />
    <style jsx>{`
      h2 {
        font-size: 3rem;
      }
    `}</style>
  </h2>
);

PostDate.propTypes = {
  date: PropTypes.number.isRequired,
  intl: intlShape.isRequired, // eslint-disable-line react/no-typos
};

const Header = props => {
  const post = findPost(props.id);
  const { title, date, image: { imageUrl } } = post;
  return (
    <header>
      <div>
        <h1>{props.title || title}</h1>
        {!props.link && date && <PostDate intl={props.intl} date={date} />}
        {props.link && <Button text="Read More" link={props.id} />}
      </div>
      <style jsx>{`
        header {
          height: 50vh;
          min-height: 500px;
          max-height: 800px;
          background: ${imageUrl
              ? `url(/static/images/posts/${webp(imageUrl).url})`
              : `url(/static/images/posts/brevite-434280.webp)`},
            ${imageUrl
              ? `url(/static/images/posts/${imageUrl})`
              : 'url(/static/images/posts/brevite-434280.jpg)'};
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
  intl: intlShape.isRequired, // eslint-disable-line react/no-typos
};

export default injectIntl(Header);
