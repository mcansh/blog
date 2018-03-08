import React from 'react';
import { Subscribe } from 'unstated';
import StateContainer from './StateContainer';
import Hamburger from './Hamburger';
import NavList from './NavList';

const Navigation = () => (
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

export default Navigation;
