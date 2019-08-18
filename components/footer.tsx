/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/anchor-is-valid */
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

  a {
    color: currentColor;
    text-decoration: none;
  }
`;

const FooterWrap = () => {
  const isAmp = useAmp();
  const {
    query: { amp, ...query },
    pathname,
  } = useRouter();
  const isHome = pathname === '/';
  return (
    <Footer>
      <Link
        href={{ pathname: '/', query: isAmp ? { ...query, amp: 1 } : query }}
      >
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
    </Footer>
  );
};

export default FooterWrap;
