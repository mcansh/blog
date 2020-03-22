import React from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';
import Portal from '@reach/portal';

import NavList from '~/components/nav-list';
import Hamburger from '~/components/hamburger';

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
  }
`;

const Navigation: React.FC = () => {
  const [navOpen, setNavOpen] = React.useState(false);
  const closeNav = () => setNavOpen(false);

  React.useEffect(() => {
    const closeNavAndEnableScroll = () => {
      clearAllBodyScrollLocks();
      closeNav();
    };

    Router.events.on('routeChangeComplete', closeNavAndEnableScroll);

    return () => {
      Router.events.off('routeChangeComplete', closeNavAndEnableScroll);
    };
  });

  const onClick = () => {
    setNavOpen(old => {
      if (old) {
        enableBodyScroll(document.body);
      } else {
        disableBodyScroll(document.body);
      }
      return !old;
    });
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
