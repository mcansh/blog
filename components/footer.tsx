import React from 'react';
import { useAmp } from 'next/amp';
// @ts-ignore
import { useRouter, RouterProps } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import { name } from '~/utils/authorInfo';

const Footer = styled.footer`
  height: 8rem;
  background: ${props => props.theme.light.background};
  font-size: 1.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (prefers-color-scheme: dark) {
    background: ${props => props.theme.dark.background};
  }
`;

const StyledLink = styled.a`
  color: currentColor;
  text-decoration: none;
`;

const FooterWrap = () => {
  const isAmp = useAmp();
  const router: RouterProps = useRouter();
  const isHome = router.pathname === '/';
  return (
    <Footer>
      <Link
        href={{ pathname: '/', query: isAmp && { amp: 1 } }}
        prefetch
        passHref
      >
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
