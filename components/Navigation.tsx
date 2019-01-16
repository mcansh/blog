import React, { useEffect } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from 'react-apollo-hooks';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';
import Hamburger from './Hamburger';
import NavList from './NavList';
import Portal from './Portal';
import { logEvent } from '../lib/analytics';

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
    opacity: ${props => (props.navOpen ? '1' : '0')};
    transition: 500ms all ease-in-out;
    will-change: opacity;
  }
`;

const LOCAL_STATE_QUERY = gql`
  query {
    navOpen @client
  }
`;

const TOGGLE_NAV_MUTATION = gql`
  mutation TOGGLE_NAV_MUTATION {
    toggleNav @client
  }
`;

const CLOSE_NAV_MUTATION = gql`
  mutation CLOSE_NAV_MUTATION {
    closeNav @client
  }
`;

const Navigation = () => {
  const toggleNav = useMutation(TOGGLE_NAV_MUTATION);
  const {
    data: { navOpen },
  } = useQuery(LOCAL_STATE_QUERY);

  const closeNav = useMutation(CLOSE_NAV_MUTATION);

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

  return (
    <Nav
      navOpen={navOpen}
      onKeyDown={event => {
        if (event.key.toLowerCase() === 'escape') {
          closeNav();
        }
      }}
    >
      <Hamburger
        onClick={() => {
          logEvent({ category: 'general', action: 'toggle nav' });
          console.log({ navOpen });

          // toggle body scrolling on click
          if (navOpen) {
            enableBodyScroll(document.querySelector('body'));
          } else {
            disableBodyScroll(document.querySelector('body'));
          }
          toggleNav();
        }}
        navOpen={navOpen}
      />
      <Portal>{navOpen && <NavList />}</Portal>
    </Nav>
  );
};

export { LOCAL_STATE_QUERY, TOGGLE_NAV_MUTATION, CLOSE_NAV_MUTATION };
export default Navigation;
