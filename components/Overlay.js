import React from 'react';
import PropTypes from 'prop-types';

const Overlay = props => (
  <div className={`overlay ${props.visible ? 'visible' : ''}`} onClick={props.onClick}>
    <style jsx>{`
      .overlay {
        background: rgba(0, 0, 0, 0.4);
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2;
        visibility: hidden;
        opacity: 0;
        transition: 500ms all ease-in-out;
        will-change: opacity;
      }

      .overlay.visible {
        visibility: visible;
        opacity: 1;
        cursor: pointer;
      }
    `}</style>
  </div>
);

Overlay.defaultProps = {
  visible: '',
};

Overlay.propTypes = {
  onClick: PropTypes.func.isRequired,
  visible: PropTypes.string,
};

export default Overlay;
