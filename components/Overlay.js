import React from 'react';

class Overlay extends React.Component {
  render() {
    return (
      <div className={`overlay ${this.props.visible ? 'visible' : ''}`} onClick={this.props.onClick}>
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
  }
}
export default Overlay;
