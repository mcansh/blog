import React from 'react';
import styled from 'styled-components';
import isAbsoluteUrl from 'is-absolute-url';
import { motion } from 'framer-motion';
import Link from 'next/link';

const NavLinks = [
  {
    name: 'Home',
    slug: '/',
  },
  {
    name: 'GitHub',
    slug: `https://github.com/${process.env.GITHUB}`,
  },
  {
    name: 'Twitter',
    slug: `https://twitter.com/${process.env.TWITTER}`,
  },
  {
    name: 'Instagram',
    slug: `https://instagram.com/${process.env.INSTAGRAM}`,
  },
  {
    name: 'Email',
    slug: `mailto:${process.env.EMAIL}`,
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

const NavList = ({ navOpen }: NavListProps) => {
  return (
    <NavStyles
      initial={false}
      animate={{
        transform: navOpen ? 'translateX(0%)' : 'translateX(-100%)',
      }}
      transition={{ duration: 0.3 }}
    >
      {NavLinks.map(({ name, slug }) => {
        const isExternal = isAbsoluteUrl(slug);
        return (
          <li key={name}>
            <Link href={slug} prefetch={!isExternal}>
              <a
                rel={isExternal ? 'noopener external nofollow' : ''}
                target={isExternal ? '_blank' : ''}
              >
                {name}
              </a>
            </Link>
          </li>
        );
      })}
    </NavStyles>
  );
};

export default NavList;
