// @flow
import React from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import Image from './Image';
import type { ImageType } from '../../types/Post';

const Button = dynamic({
  loader: () => import('../Button'),
  loading: () => null,
});

const HeaderStyles = styled.header.attrs({ 'data-testid': 'header' })`
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

  .header__content {
    z-index: 1;
    text-align: center;
    max-width: 80vw;
  }

  h1 {
    margin-bottom: 2rem;
    font-size: 3rem;

    @media (min-width: 400px) {
      font-size: 4rem;
    }
  }

  time {
    font-size: 3rem;
    display: block;
  }
`;

type Props = {
  title: string,
  link?: string,
  date?: number,
  image?: ImageType,
  noDate: boolean,
};

const formatDate = new Intl.DateTimeFormat();

const postedTime = new Intl.DateTimeFormat('default', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

const Header = ({ image, link, date, title, noDate }: Props) => {
  const showButton = link != null;

  return (
    <HeaderStyles>
      <div className="header__content">
        <h1>{title}</h1>
        {date != null && noDate === false && (
          <time dateTime={formatDate.format(date)}>
            {postedTime.format(new Date(date))}
          </time>
        )}
        {showButton && <Button text="Read More" link={link} />}
      </div>
      <Image {...image} />
    </HeaderStyles>
  );
};

Header.defaultProps = {
  link: null,
  date: null,
  image: {
    imageUrl: 'paul-volkmer-522844-unsplash.jpg',
    name: 'Paul Volkmer',
    url: 'https://unsplash.com/photos/updW-QUccFE',
  },
};

export default Header;
