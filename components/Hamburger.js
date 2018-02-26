import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { connect } from 'unistore/react';
import { actions } from '../store';

const messages = defineMessages({
  label: {
    id: 'Hamburger.label',
    defaultMessage: 'Toggle Side Nav',
  },
});

const Hamburger = ({ toggleNav, navOpen, intl: { formatMessage } }) => (
  <button aria-label={formatMessage(messages.label)} onClick={toggleNav}>
    <span />
    <style jsx>{`
      button {
        position: ${navOpen ? 'fixed' : 'absolute'};
        top: 2rem;
        left: constant(safe-area-inset-left);
        left: env(safe-area-inset-left);
        left: 2rem;
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
);

Hamburger.propTypes = {
  toggleNav: PropTypes.func.isRequired,
  navOpen: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default connect('navOpen', actions)(injectIntl(Hamburger));
