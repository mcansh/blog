import React from 'react';
import styled from 'styled-components';
import Hamburger from './Hamburger';
import NavList from './NavList';
import Portal from './Portal';
import NavigationProvider, { NavigationContext } from './NavContext';

const Nav = styled.nav`
  &::after {
    content: '';
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    visibility: ${({ navOpen }) => (navOpen ? 'visible' : 'hidden')};
    opacity: ${({ navOpen }) => (navOpen ? '1' : '0')};
    transition: 500ms all ease-in-out;
    will-change: opacity;
  }
`;

const Navigation = () => (
  <NavigationProvider>
    <NavigationContext.Consumer>
      {({ state: { navOpen } }) => (
        <Nav navOpen={navOpen}>
          <Hamburger navOpen={navOpen} />
          <Portal>{navOpen && <NavList />}</Portal>
        </Nav>
      )}
    </NavigationContext.Consumer>
  </NavigationProvider>
);

export default Navigation;
