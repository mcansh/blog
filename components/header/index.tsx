import React from 'react';
import { useAmp } from 'next/amp';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import Button from '~/components/button';
import DateHeading from '~/components/header/date';
import Image, { ImageType } from '~/components/header/image';
import Curve from '~/static/images/curve.svg';

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
    bottom: -3px;
    left: 0;
    width: 100%;
    height: 3.2rem;
    svg {
      fill: ${props => props.theme.background};
      width: 100%;
      height: 100%;
    }
  }
`;

const HeaderContent = styled.div`
  z-index: 1;
  text-align: center;
  max-width: 80vw;
`;

export const Title = animated(styled.h1`
  margin-bottom: 2rem;
  font-size: 3rem;
  @media (min-width: 400px) {
    font-size: 4rem;
  }
`);

interface Props {
  title: string;
  url?: string;
  image: ImageType;
  date?: number;
}

const Header = ({ title, url, image, date }: Props) => {
  const isAmp = useAmp();
  const props = useSpring({
    from: {
      opacity: isAmp ? 1 : 0,
      transform: isAmp ? 'translateY(0px)' : 'translateY(-50px)',
    },
    to: { opacity: 1, transform: 'translateY(0px)' },
  });

  return (
    <HeaderStyles>
      <HeaderContent>
        <Title style={props}>{title}</Title>
        {date && <DateHeading date={date} />}
        {url && <Button text="Read More" link={isAmp ? `${url}?amp=1` : url} />}
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
