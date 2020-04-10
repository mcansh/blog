/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/anchor-is-valid */
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';

import { name } from '~/utils/author-info';

const Footer = styled.footer`
  height: 8rem;
  background: ${({ theme }) => theme.background};
  font-size: 1.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.8rem;

  a {
    color: currentColor;
    text-decoration: none;
  }
`;

const FooterWrap: React.FC = () => {
  const { pathname } = useRouter();
  const isHome = pathname === '/';
  return (
    <Footer>
      <Link href={{ pathname: '/' }}>
        <a
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
        </a>
      </Link>
      <a
        target="_blank"
        rel="noopener external noreferrer"
        href="https://usefathom.com/ref/QFHYEN"
      >
        Website stats by Fathom Analytics
      </a>
    </Footer>
  );
};

export default FooterWrap;
