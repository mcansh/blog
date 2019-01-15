import React, { useEffect } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { adopt } from 'react-adopt';
import useKey from 'use-key-hook';
import { useQuery, useMutation } from 'react-apollo-hooks';
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

type QueryMutationTypes = {
  render: Function;
};

const ToggleNav = ({ render }: QueryMutationTypes) => (
  <Mutation mutation={TOGGLE_NAV_MUTATION}>{render}</Mutation>
);

const CloseNav = ({ render }: QueryMutationTypes) => (
  <Mutation mutation={CLOSE_NAV_MUTATION}>{render}</Mutation>
);

const LocalState = ({ render }: QueryMutationTypes) => (
  <Query query={LOCAL_STATE_QUERY}>{render}</Query>
);

const Composed = adopt({
  toggleNav: ToggleNav,
  closeNav: CloseNav,
  localState: LocalState,
});

const Navigation = () => {
  const toggleNav = useMutation(TOGGLE_NAV_MUTATION);
  const {
    data: { navOpen },
  } = useQuery(LOCAL_STATE_QUERY);
  const closeNav = useMutation(CLOSE_NAV_MUTATION);

  useEffect(() => {
    Router.events.on('routeChangeComplete', () => closeNav());

    return () => {
      Router.events.off('routeChangeComplete', () => closeNav());
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
