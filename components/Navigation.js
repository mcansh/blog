import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Hamburger from './Hamburger';
import NavList from './NavList';

export const NavigationContext = createContext();

class NavigationProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };
  state = { navOpen: false };

  toggleNav = () => {
    this.setState({ navOpen: !this.state.navOpen });
  };

  closeNav = () => {
    this.setState({ navOpen: false });
  };

  render() {
    return (
      <NavigationContext.Provider
        value={{
          state: this.state,
          toggleNav: this.toggleNav,
          closeNav: this.closeNav,
        }}
      >
        {this.props.children}
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
    visibility: ${props => (props.navOpen ? 'visible' : 'hidden')};
    opacity: ${props => (props.navOpen ? '1' : '0')};
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
          {navOpen && <NavList />}
        </Nav>
      )}
    </NavigationContext.Consumer>
  </NavigationProvider>
);

export default Navigation;
