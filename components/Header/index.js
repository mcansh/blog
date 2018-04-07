import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import findPost from '../../utils/findPost';
import Button from '../Button';
import Image from './Image';
import Date from './Date';

const messages = defineMessages({
  readMore: {
    id: 'Header.readMore',
    defaultMessage: 'Read More',
  },
});

const Header = ({ image, title, link, id, intl: { formatMessage } }) => {
  const post = findPost(id);
  return (
    <header>
      <div>
        <h1>{title || post.title}</h1>
        {!link && post && post.date && <Date date={post.date} />}
        {link && <Button text={formatMessage(messages.readMore)} link={id} />}
      </div>
      <Image image={image || post.image} />
      <style jsx>{`
        header {
          height: 50vh;
          min-height: 50rem;
          max-height: 80rem;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          position: relative;
        }

        @media (orientation: landscape) and (max-height: 500px) {
          header {
            max-height: 100vh;
            min-height: 100vh;
            height: 100vh;
          }
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
  image: null,
};

Header.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
  id: PropTypes.string,
  intl: intlShape.isRequired,
  image: PropTypes.shape({
    imageUrl: PropTypes.string,
    url: PropTypes.string,
    name: PropTypes.string,
  }),
};

export default injectIntl(Header);
