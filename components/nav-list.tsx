import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

import Link from '~/components/link';

const NavLinks = [
  {
    name: 'Home',
    slug: '/',
  },
  {
    name: 'GitHub',
    slug: `https://github.com/${process.env.NEXT_PUBLIC_GITHUB}`,
  },
  {
    name: 'Twitter',
    slug: `https://twitter.com/${process.env.NEXT_PUBLIC_TWITTER}`,
  },
  {
    name: 'Instagram',
    slug: `https://instagram.com/${process.env.NEXT_PUBLIC_INSTAGRAM}`,
  },
  {
    name: 'Email',
    slug: `mailto:${process.env.NEXT_PUBLIC_EMAIL}`,
  },
  {
    name: 'Changelog',
    slug: `${process.env.GITHUB_URL}/releases`,
  },
];

const NavStyles = styled(motion.ul)`
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

  li {
    margin: 1rem 0;
    color: white;

    a {
      color: currentcolor;
      text-decoration: none;
      font-size: 3rem;
      &:hover {
        color: rgba(255, 255, 255, 0.6);
      }
    }
  }
`;

interface NavListProps {
  navOpen: boolean;
}

const NavList: React.FC<NavListProps> = ({ navOpen }) => (
  <AnimatePresence>
    {navOpen && (
      <NavStyles
        initial={{ transform: 'translateX(-100%)' }}
        animate={{ transform: 'translateX(0%)' }}
        exit={{ transform: 'translateX(-100%)' }}
        transition={{ duration: 0.3 }}
      >
        {NavLinks.map(({ name, slug }) => (
          <li key={name}>
            <Link href={slug}>{name}</Link>
          </li>
        ))}
      </NavStyles>
    )}
  </AnimatePresence>
);

export default NavList;
export { NavLinks };
