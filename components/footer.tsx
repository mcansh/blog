import React from 'react';
import { useRouter } from 'next/router';
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
  const router = useRouter();
  const isHome = router.pathname === '/';
  return (
    <Footer>
      <Link href={{ pathname: '/', query: router.query }} passHref>
        <StyledLink
          rel="home"
          aria-label="go home"
          onClick={event => {
            if (isHome) {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          &copy; {new Date().getFullYear()} {name}
        </StyledLink>
      </Link>
    </Footer>
  );
};

export default FooterWrap;
