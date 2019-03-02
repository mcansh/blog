import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';
import Hamburger from '~/components/hamburger.tsx';
import Portal from '~/components/portal.tsx';
import { logEvent } from '~/lib/analytics.ts';

// @ts-ignore
const NavList = dynamic({
  loader: () => import('~/components/nav-list'),
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
    setNavOpen(false);
  };

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
    const nextNavOpen = !navOpen;
    setNavOpen(nextNavOpen);
    if (nextNavOpen) {
      disableBodyScroll(document.querySelector('body'));
    } else {
      enableBodyScroll(document.querySelector('body'));
    }
  };

  return (
    <Nav
      navOpen={navOpen}
      onKeyDown={(event: React.KeyboardEvent) => {
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
