import React from 'react';
import colors from '../theme';
import { author } from '../package.json';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="footerContent">
        <p>&copy; {year} {author.name}</p>
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
      `}</style>
    </footer>
  );
};

export default Footer;
