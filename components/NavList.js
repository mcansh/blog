import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const NavLinks = [
  { name: 'Home', slug: '/' },
  { name: 'GitHub', slug: `http://github.com/${process.env.GITHUB}` },
  { name: 'Twitter', slug: `http://twitter.com/${process.env.TWITTER}` },
  { name: 'Email', slug: `mailto:${process.env.EMAIL}` }
];

const NavList = ({ blockClicks }) => (
  <ul onClick={blockClicks}>
    {NavLinks.map(({ name, slug }) => (
      <li key={name}>
        <Link href={slug}>
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
        box-shadow: 4px 0 1.5rem 3px rgba(0, 0, 0, 0.4);
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

NavList.propTypes = {
  blockClicks: PropTypes.func.isRequired
};

export default NavList;
