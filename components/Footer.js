import React from 'react';
import Link from 'next/link';
import { injectIntl, intlShape } from 'react-intl';
import colors from '../theme';
import { name } from '../lib/authorInfo';

const Footer = ({ intl: { formatDate } }) => (
  <footer>
    <Link href="/">
      <a rel="home">
        &copy; {formatDate(new Date(), { year: 'numeric' })} ${name}
      </a>
    </Link>
    <style jsx>{`
      footer {
        height: 8rem;
        background: ${colors.background};
        font-size: 1.4rem;
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

Footer.propTypes = {
  intl: intlShape.isRequired, // eslint-disable-line react/no-typos
};

export default injectIntl(Footer);
