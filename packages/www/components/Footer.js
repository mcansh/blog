// @flow
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const FooterStyles = styled.footer`
  color: #212121;
  text-align: center;
  padding: 3rem 0;
  font-size: 1.3rem;
  a {
    color: currentColor;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Footer = () => (
  <FooterStyles>
    <p>
      &copy; {new Date().getFullYear()}{' '}
      <Link href="/" prefetch>
        <a>Logan McAnsh</a>
      </Link>
    </p>
  </FooterStyles>
);

export default Footer;
