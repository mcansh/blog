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
  mutation TOGGLE_NAV_MUTATION {
    toggleNav @client
  }
`;

const CLOSE_NAV_MUTATION = gql`
  mutation CLOSE_NAV_MUTATION {
    closeNav @client
  }
`;

const ToggleNav = ({ render }) => (
  <Mutation mutation={TOGGLE_NAV_MUTATION}>{render}</Mutation>
);

const QueryMutationProps = {
  render: PropTypes.func.isRequired,
};

ToggleNav.propTypes = QueryMutationProps;

const CloseNav = ({ render }) => (
  <Mutation mutation={CLOSE_NAV_MUTATION}>{render}</Mutation>
);

CloseNav.propTypes = QueryMutationProps;

const LocalState = ({ render }) => (
  <Query query={LOCAL_STATE_QUERY}>{render}</Query>
);

LocalState.propTypes = QueryMutationProps;

const Composed = adopt({
  toggleNav: ToggleNav,
  closeNav: CloseNav,
  localState: LocalState,
});

const Navigation = () => (
  <Composed>
    {({ closeNav, toggleNav, localState }) => {
      const { navOpen } = localState.data;
      Router.onRouteChangeComplete = () => closeNav();
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

export { LOCAL_STATE_QUERY, TOGGLE_NAV_MUTATION, CLOSE_NAV_MUTATION };
export default Navigation;
