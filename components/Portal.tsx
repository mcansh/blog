import React from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children: React.ReactNode;
};

class Portal extends React.Component<Props> {
  element = null;

  componentDidMount = () => {
    this.element = document.getElementById('portal');
  };

  render() {
    if (this.element == null) return null;
    const { children } = this.props;
    return createPortal(children, this.element);
  }
}

export default Portal;
