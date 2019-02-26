import React from 'react';
import { useAmp } from 'next/amp';
import Link from 'next/link';
import styled from 'styled-components';
import { name } from '~/utils/authorInfo';

const Footer = styled.footer`
  height: 8rem;
  background: ${({ theme }) => theme.background};
  font-size: 1.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLink = styled.a`
  color: currentColor;
  text-decoration: none;
`;

const FooterWrap = () => {
  const isAmp = useAmp();
  return (
    <Footer>
      <Link href={isAmp ? '/?amp=1' : '/'} prefetch passHref>
        <StyledLink rel="home" aria-label="go home">
          &copy; {new Date().getFullYear()} {name}
        </StyledLink>
      </Link>
    </Footer>
  );
};

export default FooterWrap;
