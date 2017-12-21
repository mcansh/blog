import React from 'react';
import Hamburger from './Hamburger';
import NavList from './NavList';

class Navigation extends React.Component {
  state = {
    open: false
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKey, true);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKey, true);
  }

  handleKey = e => {
    if (e.keyCode === 27) {
      this.setState({ open: false });
    }
  };

  toggleClass = () => {
    this.setState({ open: !this.state.open });
  };

  blockClicks = e => {
    if (e.target.tagName !== 'A') {
      e.stopPropagation();
    }
  };

  render() {
    const { open } = this.state;
    return (
      <nav onClick={this.toggleClass}>
        <Hamburger onClick={this.toggleClass} open={open} />
        {open && <NavList blockClicks={this.blockClicks} open={open} />}
        <style jsx>{`
          nav::before {
            content: '';
            background: rgba(0, 0, 0, 0.4);
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2;
            visibility: ${open ? 'visible' : 'hidden'};
            opacity: ${open ? '1' : '0'};
            transition: 500ms all ease-in-out;
            will-change: opacity;
          }
        `}</style>
      </nav>
    );
  }
}

export default Navigation;
