import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { logEvent } from '../lib/analytics';

export const NavigationContext = React.createContext();

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

export default NavigationProvider;
