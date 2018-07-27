import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Router from 'next/router';
import Hamburger from './Hamburger';
import NavList from './NavList';
import { logEvent } from '../lib/analytics';
import Portal from './Portal';
import NavigationContext from './NavContext';

class NavigationProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = { navOpen: false };

  toggleNav = () => {
    const { navOpen } = this.state;
    this.setState({ navOpen: !navOpen });
    logEvent({ category: 'general', action: 'toggle nav' });
  };

  closeNav = () => {
    this.setState({ navOpen: false });
  };

  render() {
    Router.onRouteChangeComplete = () => this.closeNav();
    const { children } = this.props;
    return (
      <NavigationContext.Provider
        value={{
          state: this.state,
          toggleNav: this.toggleNav,
          closeNav: this.closeNav,
        }}
      >
        {children}
      </NavigationContext.Provider>
    );
  }
}

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
