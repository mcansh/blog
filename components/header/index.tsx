import React from 'react';
import { useAmp } from 'next/amp';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

import Button from '~/components/button';
import DateHeading from '~/components/header/date';
import Image, { ImageType } from '~/components/header/image';
import Curve from '~/public/static/images/curve.svg';

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

export const Title = styled(motion.h1)`
  margin-bottom: 2rem;
  font-size: 3rem;
  @media (min-width: 400px) {
    font-size: 4rem;
  }
`;

interface Props {
  title: string;
  url?: string;
  image: ImageType;
  date?: string;
}

const Header: React.FC<Props> = ({ title, url, image, date }) => {
  const isAmp = useAmp();
  const {
    query: { amp, ...query },
  } = useRouter();

  return (
    <HeaderStyles>
      <HeaderContent>
        <AnimatePresence exitBeforeEnter>
          <Title
            initial={{
              opacity: isAmp ? 1 : 0,
              translateY: isAmp ? 0 : -50,
            }}
            animate={{
              opacity: 1,
              translateY: 0,
            }}
            exit={{
              opacity: 0,
              translateY: 50,
            }}
          >
            {title}
          </Title>
        </AnimatePresence>
        <noscript>
          <Title>{title}</Title>
        </noscript>
        {date && <DateHeading date={date} />}
        {url && (
          <Button
            href={{
              pathname: url,
              query: isAmp ? { ...query, amp: '1' } : query,
            }}
          >
            Read More
          </Button>
        )}
      </HeaderContent>
      <Image image={image} />
      <figure>
        <Curve role="presentation" />
      </figure>
    </HeaderStyles>
  );
};

export default Header;
