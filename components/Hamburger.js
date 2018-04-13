import React from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { Subscribe } from 'unstated';
import StateContainer from './StateContainer';

const messages = defineMessages({
  label: {
    id: 'Hamburger.label',
    defaultMessage: 'Toggle Side Nav',
  },
});

const Hamburger = ({ intl: { formatMessage } }) => (
  <Subscribe to={[StateContainer]}>
    {({ toggleNav, state: { navOpen } }) => (
      <button aria-label={formatMessage(messages.label)} onClick={toggleNav}>
        <span />
        <style jsx>{`
          button {
            position: ${navOpen ? 'fixed' : 'absolute'};
            top: 2rem;
            top: constant(safe-area-inset-top);
            top: env(safe-area-inset-top);
            left: 2rem;
            left: constant(safe-area-inset-left);
            left: env(safe-area-inset-left);
            appearance: none;
            height: 4rem;
            width: 4rem;
            background: none;
            border: none;
            padding: 0;
            z-index: 4;
            cursor: pointer;
            overflow: hidden;
          }

          @supports (padding: max(0rem)) {
            button {
              left: max(2rem, env(safe-area-inset-left));
              top: max(2rem, env(safe-area-inset-top));
            }
          }

          button span {
            width: 100%;
            height: 0.2rem;
            background: white;
            display: block;
            position: relative;
            border-radius: 0.5rem;
            transition: ${navOpen ? '350ms all ease-in' : '150ms all ease'};
            will-change: transform;
            top: ${navOpen ? 0 : '-1rem'};
            transform: ${navOpen ? 'rotate(45deg)' : 'none'};
          }

          button span::before,
          button span::after {
            content: '';
            width: 100%;
            height: 0.2rem;
            position: absolute;
            left: 0;
            background: white;
            border-radius: 0.5rem;
            transition: 150ms all ease;
            will-change: transform;
          }

          button span::before {
            top: ${navOpen ? 0 : '1rem'};
            visibility: ${navOpen ? 'hidden' : 'visible'};
            opacity: ${navOpen ? 0 : 1};
            transform: ${navOpen ? 'rotate(-45deg)' : 'none'};
            transition: ${navOpen ? '350ms all ease-in' : '150ms all ease'};
          }

          button span::after {
            top: ${navOpen ? 0 : '2rem'};
            transition: ${navOpen ? '350ms all ease-in' : '150ms all ease'};
            transform: ${navOpen ? 'rotate(-90deg)' : 'none'};
          }
        `}</style>
      </button>
    )}
  </Subscribe>
);

Hamburger.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Hamburger);
