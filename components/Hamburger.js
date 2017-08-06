import React from 'react';

class Hamburger extends React.Component {
  render() {
    return (
      <button onClick={this.props.onClick} className={this.props.open ? 'open' : ''}>
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
            z-index: 4;
            cursor: pointer;
            overflow: hidden;
          }

          button span {
            width: 100%;
            height: 2px;
            background: white;
            display: block;
            position: relative;
            border-radius: 5px;
            transition: 150ms all ease;
            will-change: transform;
            top: -10px;
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
            transition: 150ms all ease;
            will-change: transform;
          }

          button span::before {
            top: 10px;
          }

          button span::after {
            top: 20px;
          }

          button.open span {
            transform: rotate(45deg);
            top: 0;
          }

          button.open span::before {
            visibility: hidden;
            opacity: 0;
            transform: rotate(-45deg);
            top: 0;
            left: 0;
          }

          button.open span::after {
            transform: rotate(-90deg);
            top: 0;
          }
        `}</style>
      </button>
    );
  }
}
export default Hamburger;
