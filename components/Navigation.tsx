import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';
import Hamburger from './Hamburger';
// import NavList from './NavList';
import Portal from './Portal';
import { logEvent } from '../lib/analytics';

const NavList = dynamic({
  loader: () => import('./NavList') as any,
  loading: () => null,
});

const Nav = styled.nav<{ navOpen: boolean }>`
  &::after {
    content: '';
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    visibility: ${props => (props.navOpen ? 'visible' : 'hidden')};
    opacity: ${props => (props.navOpen ? 1 : 0)};
    transition: 500ms all ease-in-out;
    will-change: opacity;
  }
`;

const Navigation = () => {
  const [navOpen, setNavOpen] = useState(false);
  const closeNav = () => {
    console.log('closeNav');
    setNavOpen(false);
  };
  const toggleNav = () => setNavOpen(old => !old);

  useEffect(() => {
    Router.events.on('routeChangeComplete', () => {
      clearAllBodyScrollLocks();
      closeNav();
    });

    return () => {
      Router.events.off('routeChangeComplete', () => {
        clearAllBodyScrollLocks();
        closeNav();
      });
    };
  });

  const onClick = () => {
    logEvent({ category: 'general', action: 'toggle nav' });

    if (navOpen) {
      disableBodyScroll(document.querySelector('body'));
    } else {
      enableBodyScroll(document.querySelector('body'));
    }
    toggleNav();
  };

  return (
    <Nav
      navOpen={navOpen}
      onKeyDown={event => {
        if (event.key.toLowerCase() === 'escape') {
          closeNav();
        }
      }}
    >
      <Hamburger onClick={onClick} navOpen={navOpen} />
      <Portal>
        <NavList navOpen={navOpen} />
      </Portal>
    </Nav>
  );
};

export default Navigation;
