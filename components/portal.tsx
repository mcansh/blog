import React from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: React.ReactNode;
}

class Portal extends React.Component<Props> {
  private element = null;

  public componentDidMount = () => {
    this.element = document.getElementById('portal');
  };

  public render() {
    if (this.element == null) return null;
    const { children } = this.props;
    return createPortal(children, this.element);
  }
}

export default Portal;
