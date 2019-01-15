import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { name } from '../utils/authorInfo';

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

const FooterWrap = () => (
  <Footer>
    <Link href="/" prefetch passHref>
      <StyledLink rel="home" aria-label="go home">
        &copy; {new Date().getFullYear()} {name}
      </StyledLink>
    </Link>
  </Footer>
);

export default FooterWrap;
