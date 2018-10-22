import React from 'react';
import { createPortal } from 'react-dom';

class Portal extends React.Component {
  componentDidMount = () => {
    this.element = document.getElementById('portal');
  };

  render() {
    if (!this.element) return null;
    const { children } = this.props;
    return createPortal(children, this.element);
  }
}

export default Portal;
