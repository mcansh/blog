import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'unistore/react';
import { actions } from '../store';

const Hamburger = ({ toggleNav, navOpen }) => (
  <button aria-label="toggle side nav" onClick={toggleNav}>
    <span />
    <style jsx>{`
      button {
        position: absolute;
        top: 20px;
        left: constant(safe-area-inset-left);
        left: env(safe-area-inset-left);
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
        transition: ${navOpen ? '350ms all ease-in' : '150ms all ease'};
        will-change: transform;
        top: ${navOpen ? 0 : '-10px'};
        transform: ${navOpen ? 'rotate(45deg)' : 'none'};
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
        top: ${navOpen ? 0 : '10px'};
        visibility: ${navOpen ? 'hidden' : 'visible'};
        opacity: ${navOpen ? 0 : 1};
        transform: ${navOpen ? 'rotate(-45deg)' : 'none'};
        transition: ${navOpen ? '350ms all ease-in' : '150ms all ease'};
      }
      button span::after {
        top: ${navOpen ? 0 : '20px'};
        transition: ${navOpen ? '350ms all ease-in' : '150ms all ease'};
        transform: ${navOpen ? 'rotate(-90deg)' : 'none'};
      }
    `}</style>
  </button>
);

Hamburger.propTypes = {
  toggleNav: PropTypes.func.isRequired,
  navOpen: PropTypes.bool.isRequired,
};

export default connect('navOpen', actions)(Hamburger);
