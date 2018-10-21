// @flow

import React from 'react';
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

const Header = styled.header.attrs({ 'data-testid': 'header' })`
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
  margin-bottom: 2rem;
  font-size: 3rem;

  @media (min-width: 400px) {
    font-size: 4rem;
  }
`;

type Props = {
  image?: {
    imageUrl: string,
    name: string,
    url?: string,
  },
  title?: string,
  link?: string,
  id?: string,
};

const HeaderWrap = ({ image, title, link, id }: Props) => {
  const post = findPost(id);

  const hasPost = post != null;
  const headerTitle = hasPost ? post.title : title;
  const showLink = link != null;
  const showDate = link == null && hasPost && post.date;

  return (
    <Header>
      <HeaderContent>
        <Title>{headerTitle}</Title>
        {showDate ? <Date date={post.date} /> : null}
        {showLink ? (
          <Button
            text={<FormattedMessage {...messages.readMore} />}
            link={id}
          />
        ) : null}
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

export default HeaderWrap;
