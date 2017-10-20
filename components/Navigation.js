import React from 'react';
import Hamburger from './Hamburger';
import NavList from './NavList';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false, hamburgerColor: 'white' };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, true);
    window.addEventListener('keydown', this.handleKey, true);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, true);
    window.removeEventListener('keydown', this.handleKey, true);
  }

  handleScroll = () => {
    const header = document.querySelector('header');
    let hamburgerColor;
    if (window.pageYOffset > header.offsetHeight) {
      hamburgerColor = 'black';
    } else {
      hamburgerColor = 'white';
    }
    this.setState({ hamburgerColor });
  };

  handleKey = e => {
    if (e.keyCode === 27) {
      this.setState({ open: false });
    }
  };

  toggleClass = () => {
    this.setState({ open: !this.state.open });
  };

  blockClicks = e => {
    e.stopPropagation();
  };

  render() {
    return (
      <nav className={this.state.open ? 'open' : ''} onClick={this.toggleClass}>
        <Hamburger
          onClick={this.toggleClass}
          open={this.state.open}
          hamburgerColor={this.state.hamburgerColor}
        />
        <NavList blockClicks={this.blockClicks} />
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
            visibility: hidden;
            opacity: 0;
            transition: 500ms all ease-in-out;
            will-change: opacity;
          }

          nav.open::before {
            visibility: visible;
            opacity: 1;
          }
        `}</style>
      </nav>
    );
  }
}

export default Navigation;
