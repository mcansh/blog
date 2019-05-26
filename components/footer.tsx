import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import { name } from '~/utils/authorInfo';

// eslint-disable-next-line clean-styled-components/single-component-per-file
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
  const { query } = useRouter();
  return (
    <Footer>
      <Link href={{ pathname: '/', query }}>
        <a rel="home" aria-label="go home">
          &copy; {new Date().getFullYear()} {name}
        </a>
      </Link>
    </Footer>
  );
};

export default FooterWrap;
