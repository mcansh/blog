import React from 'react';
import PropTypes from 'prop-types';
import { Subscribe } from 'unstated';
import StateContainer from './StateContainer';
import Hamburger from './Hamburger';
import NavList from './NavList';

class Navigation extends React.Component {
  static propTypes = {
    toggleNav: PropTypes.func.isRequired,
    navOpen: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKey, true);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKey, true);
  }

  handleKey = e => {
    if (
      (this.props.navOpen && e.keyCode === 27) ||
      (this.props.navOpen && e.key === 'Escape') ||
      (this.props.navOpen && e.code === 'Escape')
    ) {
      this.props.toggleNav();
    }
  };

  render() {
    return (
      <Subscribe to={[StateContainer]}>
        {({ state: { navOpen } }) => (
          <nav>
            <Hamburger />
            {navOpen && <NavList />}
            <style jsx>{`
              nav::after {
                content: '';
                background: rgba(0, 0, 0, 0.4);
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 2;
                visibility: ${navOpen ? 'visible' : 'hidden'};
                opacity: ${navOpen ? '1' : '0'};
                transition: 500ms all ease-in-out;
                will-change: opacity;
              }
            `}</style>
          </nav>
        )}
      </Subscribe>
    );
  }
}

export default Navigation;
