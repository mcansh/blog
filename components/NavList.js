import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const NavLinks = [
  { name: 'Home', slug: '/' },
  { name: 'GitHub', slug: `http://github.com/${process.env.GITHUB}` },
  { name: 'Twitter', slug: `http://twitter.com/${process.env.TWITTER}` },
  { name: 'Email', slug: `mailto:${process.env.EMAIL}` },
  { name: 'Code', slug: 'https://github.com/mcansh/blog' },
];

const NavList = props => (
  <ul onClick={props.blockClicks}>
    {NavLinks.map(({ name, slug }) => (
      <li key={name}><Link href={slug}><a>{name}</a></Link></li>
    ))}
    <style jsx global>{`
      nav.open ul {
        transform: none;
        transition: 350ms all ease-in;
      }
    `}</style>
    <style jsx>{`
      ul {
        height: 100vh;
        max-width: 400px;
        width: 95%;
        position: fixed;
        background: black;
        top: 0;
        left: 0;
        z-index: 3;
        list-style: none;
        margin: 0;
        padding: 0;
        transform: translate3d(-100vw, 0, 0);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: 250ms all ease;
        box-shadow: 4px 0 15px 3px rgba(0, 0, 0, 0.4);
        will-change: transform;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
      }

      li {
        margin: 10px 0;
        color: white;
      }

      li > a {
        color: currentcolor;
        text-decoration: none;
        font-size: 2.35em;
      }

      li > a:hover {
        color: rgba(255, 255, 255, 0.6)
      }
    `}</style>
  </ul>
);

NavList.propTypes = {
  blockClicks: PropTypes.func.isRequired,
};

export default NavList;
