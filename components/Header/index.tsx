import React from 'react';
import styled from 'styled-components';
import { Spring, animated } from 'react-spring';
import Button from '../Button';
import Image from './Image';
import Date from './Date';

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

const AnimatedTitle = animated(Title);

export interface ImageTypes {
  imageUrl: string;
  photographer?: string;
  url?: string;
}

interface Props {
  title: string;
  url?: string;
  image?: ImageTypes;
  date?: number;
}

const Header = ({ title, url, image, date }: Props) => {
  return (
    <HeaderStyles>
      <HeaderContent>
        <Spring
          native
          from={{ opacity: 0, transform: 'translateY(-50px)' }}
          to={{ opacity: 1, transform: 'translateY(0px)' }}
        >
          {props => <AnimatedTitle style={props}>{title}</AnimatedTitle>}
        </Spring>
        {date && <Date date={date} />}
        {url && <Button text="Read More" link={url} />}
      </HeaderContent>
      <Image image={image} />
    </HeaderStyles>
  );
};

Header.defaultProps = {
  url: null,
  image: null,
  date: null,
};

export default Header;
