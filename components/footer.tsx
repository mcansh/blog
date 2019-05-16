import React from 'react';
import { useAmp } from 'next/amp';
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
  const isAmp = useAmp();
  const router = useRouter();
  const isHome = router.pathname === '/';
  const href = isAmp ? `/?amp=1` : '/';
  return (
    <Footer>
      <Link href={href} prefetch passHref>
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
