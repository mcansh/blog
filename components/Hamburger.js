import React from 'react';

class Hamburger extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.onClick = this.toggleClass.bind(this);
  }

  toggleClass() {
    this.setState({ open: !this.state.open });
    document.querySelector('nav').classList.toggle('open');
  }

  render() {
    return (
      <button onClick={this.onClick}>
        <span />
        <style jsx>{`
          button {
            position: absolute;
            top: 20px;
            left: 20px;
            appearance: none;
            height: 40px;
            width: 40px;
            background: none;
            border: none;
            padding: 0;
            z-index: 3;
            cursor: pointer;
          }

          button span {
            width: 100%;
            height: 2px;
            background: white;
            display: block;
            position: relative;
            border-radius: 5px;
            transition: 500ms all ease-in-out;
          }

          button span::before,
          button span::after {
            content: '';
            width: 100%;
            height: 2px;
            position: absolute;
            left: 0;
            background: white;
            border-radius: 5px;
            transition: 500ms all ease-in-out;
          }

          button span::before {
            top: -10px;
          }

          button span::after {
            top: 10px;
          }

          nav.open button span {
            transform: rotate(45deg);
            top: 0
          }

          nav.open button span::before {
            transform: rotate(-90deg);
            top: 0
          }

          nav.open button span::after {
            top: 0;
            visibility: hidden;;
          }
        `}</style>
      </button>
    );
  }
}
export default Hamburger;
