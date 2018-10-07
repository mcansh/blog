import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import styled from 'styled-components';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { adopt } from 'react-adopt';
import Hamburger from './Hamburger';
import NavList from './NavList';
import Portal from './Portal';
import { logEvent } from '../lib/analytics';

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

const LOCAL_STATE_QUERY = gql`
  query {
    navOpen @client
  }
`;

const TOGGLE_NAV_MUTATION = gql`
  mutation TOGGLE_NAV_MUTATION($open: Boolean) {
    toggleNav(open: $open) @client
  }
`;

const ToggleNav = ({ render }) => (
  <Mutation mutation={TOGGLE_NAV_MUTATION}>{render}</Mutation>
);

ToggleNav.propTypes = {
  render: PropTypes.func.isRequired,
};

const LocalState = ({ render }) => (
  <Query query={LOCAL_STATE_QUERY}>{render}</Query>
);

LocalState.propTypes = {
  render: PropTypes.func.isRequired,
};

const Composed = adopt({
  toggleNav: ToggleNav,
  localState: LocalState,
});

const Navigation = () => (
  <Composed>
    {({ toggleNav, localState }) => {
      const { navOpen } = localState.data;
      Router.onRouteChangeComplete = () => toggleNav();
      return (
        <Nav navOpen={navOpen}>
          <Hamburger
            onClick={() => {
              logEvent({ category: 'general', action: 'toggle nav' });
              toggleNav();
            }}
            navOpen={navOpen}
          />
          <Portal>{navOpen && <NavList />}</Portal>
        </Nav>
      );
    }}
  </Composed>
);

export { LOCAL_STATE_QUERY, TOGGLE_NAV_MUTATION };
export default Navigation;
