// @flow
import React from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import Hamburger from './MenuButton';
import NavList from './List';
import Portal from '../Portal';
import { logEvent } from '../../utils/analytics';
import { NavContext } from '../../pages/_app';

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
    visibility: ${props => (props.navOpen ? 'visible' : 'hidden')};
    opacity: ${props => (props.navOpen ? '1' : '0')};
    transition: 500ms all ease-in-out;
    will-change: opacity;
  }
`;

const Navigation = () => (
  <NavContext.Consumer>
    {context => {
      if (!context) return null;
      Router.events.on('routeChangeComplete', () => context.toggleNav(false));
      return (
        <Nav
          navOpen={context.open}
          onKeyDown={event => {
            if (
              event.key === 'Escape' ||
              event.code === 'Escape' ||
              event.which === 27
            ) {
              context.toggleNav(false);
            }
          }}
        >
          <Hamburger
            onClick={() => {
              logEvent({ category: 'general', action: 'toggle nav' });
              context.toggleNav();
            }}
            navOpen={context.open}
          />
          <Portal>{context.open === true && <NavList />}</Portal>
        </Nav>
      );
    }}
  </NavContext.Consumer>
);

export default Navigation;
