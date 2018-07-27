import { Component } from 'react';
import { createPortal } from 'react-dom';
import { node } from 'prop-types';

class Portal extends Component {
  static propTypes = {
    children: node.isRequired,
  };

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
