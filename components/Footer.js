import React from 'react';
import Link from 'next/link';
import colors from '../theme';
import { author } from '../package.json';

const { name } = author;
const year = new Date().getFullYear();

const Footer = () => (
  <footer>
    <div className="footerContent">
      <Link href="/">
        <a rel="home">
          &copy; {year} {name}
        </a>
      </Link>
    </div>
    <style jsx>{`
      footer {
        height: 4em;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        background: ${colors.background};
        z-index: -1;
      }

      .footerContent {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      a {
        color: CurrentColor;
        text-decoration: none;
      }
    `}</style>
  </footer>
);

export default Footer;
