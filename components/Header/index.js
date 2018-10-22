// @flow
import React from 'react';
import styled from 'styled-components';
import FindPost from '../../utils/findPost';
import Button from '../Button';
import Image from './Image';
import Date from './Date';

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

export type ImageTypes = {
  imageUrl: string,
  name?: string | null,
  url?: string | null,
};

type Props = {
  title?: string | null,
  link?: string | null,
  id?: string | null,
  image?: ImageTypes | null,
};

const HeaderWrap = ({ image, title, link, id }: Props) => (
  <FindPost id={id}>
    {post => {
      const headerTitle = title != null ? title : post.title;
      const headerImage = image != null ? image : post.image;
      const showDate = link == null && post?.date;
      const showLink = link != null && post?.id;
      return (
        <Header>
          <HeaderContent>
            <Title>{headerTitle}</Title>
            {showDate && <Date date={post.date} />}
            {showLink && <Button text="Read More" link={post.id} />}
          </HeaderContent>
          <Image image={headerImage} />
        </Header>
      );
    }}
  </FindPost>
);

HeaderWrap.defaultProps = {
  link: null,
  id: null,
  title: null,
  image: null,
};

export default HeaderWrap;
