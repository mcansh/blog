import React from 'react';
import Hamburger from './Hamburger';
import NavList from './NavList';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false, hamburgerColor: 'white' };
    this.onClick = this.toggleClass.bind(this);
    this.blockClicks = this.blockClicks.bind(this);
  }

  componentDidMount() {
    const header = document.querySelector('header');

    const handleScroll = () => {
      if (window.scrollY > header.offsetHeight) {
        this.setState({ hamburgerColor: 'black' });
      } else {
        this.setState({ hamburgerColor: 'white' });
      }
    };

    window.addEventListener('scroll', handleScroll);
  }

  toggleClass() {
    this.setState({ open: !this.state.open });
  }

  blockClicks(e) {
    e.stopPropagation();
  }

  render() {
    return (
      <nav
        className={this.state.open ? 'open' : ''}
        onClick={this.onClick}
        >
        <NavList blockClicks={this.blockClicks} />
        <Hamburger onClick={this.onClick} open={this.state.open} hamburgerColor={this.state.hamburgerColor} />
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
