import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import Button from '~/components/Button';
import DateHeading from '~/components/Header/Date';
import Image, { ImageType } from '~/components/Header/Image';
import Curve from '~/components/icons/curve.svg';

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

  figure {
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translateY(50%);
    width: 100%;
    svg {
      fill: ${props => props.theme.background};
    }
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

interface Props {
  title: string;
  url?: string;
  image?: ImageType;

  date?: number;
}

const Header = ({ title, url, image, date }: Props) => {
  const props = useSpring({
    from: { opacity: 0, transform: 'translateY(-50px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
  });

  return (
    <HeaderStyles>
      <HeaderContent>
        <AnimatedTitle style={props}>{title}</AnimatedTitle>
        {date && <DateHeading date={date} />}
        {url && <Button text="Read More" link={url} />}
      </HeaderContent>
      <Image image={image} />
      <figure>
        <Curve />
      </figure>
    </HeaderStyles>
  );
};

Header.defaultProps = {
  url: null,
  image: null,
  date: null,
};

export default Header;
