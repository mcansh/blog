import React from 'react';
import Router from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'unistore/react';
import { actions } from '../store';
import isExternal from '../utils/isExternal';

const NavLinks = [
  {
    name: <FormattedMessage id="NavList.home" defaultMessage="Home" />,
    slug: '/',
  },
  {
    name: <FormattedMessage id="NavList.github" defaultMessage="GitHub" />,
    slug: `https://github.com/${process.env.GITHUB}`,
  },
  {
    name: <FormattedMessage id="NavList.twitter" defaultMessage="Twitter" />,
    slug: `https://twitter.com/${process.env.TWITTER}`,
  },
  {
    name: (
      <FormattedMessage id="NavList.instagram" defaultMessage="Instagram" />
    ),
    slug: `https://twitter.com/${process.env.INSTAGRAM}`,
  },
  {
    name: <FormattedMessage id="NavList.email" defaultMessage="Email" />,
    slug: `mailto:${process.env.EMAIL}`,
  },
];

const NavList = ({ closeNav }) => {
  Router.onRouteChangeStart = () => closeNav();
  return (
    <ul>
      {NavLinks.map(({ name, slug }) => (
        <li key={name}>
          <Link href={slug} prefetch={!isExternal(slug)}>
            <a>{name}</a>
          </Link>
        </li>
      ))}
      <style jsx>{`
        ul {
          height: 100vh;
          max-width: 40rem;
          width: 95%;
          position: fixed;
          background: black;
          top: 0;
          left: 0;
          z-index: 3;
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 0.4rem 0 1.5rem 0.3rem rgba(0, 0, 0, 0.4);
          will-change: transform;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          animation: openNav 250ms ease;
        }

        li {
          margin: 1rem 0;
          color: white;
        }

        li > a {
          color: currentcolor;
          text-decoration: none;
          font-size: 3rem;
        }

        li > a:hover {
          color: rgba(255, 255, 255, 0.6);
        }

        @keyframes openNav {
          0% {
            transform: translate3d(-100vw, 0, 0);
          }
          100% {
            transform: none;
          }
        }
      `}</style>
    </ul>
  );
};

NavList.propTypes = {
  closeNav: PropTypes.func.isRequired,
};

export default connect('navOpen', actions)(NavList);
