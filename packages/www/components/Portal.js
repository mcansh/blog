// @flow
import { Component, type Node } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children: Node,
};

class Portal extends Component<Props> {
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
