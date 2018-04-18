import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, FormattedMessage } from 'react-intl';
import styled from 'styled-components';
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

const Header = styled.header`
  height: 50vh;
  min-height: 50rem;
  max-height: 80rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  position: relative;

  @media (orientation: landscape) and (max-height: 500px) {
    max-height: 100vh;
    min-height: 100vh;
    height: 100vh;
  }
`;

const HeaderContent = styled.div`
  z-index: 1;
  text-align: center;
  max-width: 80vw;
`;

export const Title = styled.h1`
  font-size: 5rem;
  margin-bottom: 2rem;
`;

const HeaderWrap = ({ image, title, link, id }) => {
  const post = findPost(id);
  return (
    <Header>
      <HeaderContent>
        <Title>{title || post.title}</Title>
        {!link && post && post.date && <Date date={post.date} />}
        {link && (
          <Button
            text={<FormattedMessage {...messages.readMore} />}
            link={id}
          />
        )}
      </HeaderContent>
      <Image image={image || post.image} />
    </Header>
  );
};

HeaderWrap.defaultProps = {
  link: null,
  id: null,
  title: null,
  image: null,
};

HeaderWrap.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
  id: PropTypes.string,
  image: PropTypes.shape({
    imageUrl: PropTypes.string,
    url: PropTypes.string,
    name: PropTypes.string,
  }),
};

export default HeaderWrap;
