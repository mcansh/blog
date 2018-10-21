// @flow
import * as React from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children: React.Node,
};

class Portal extends React.Component<Props> {
  componentDidMount = () => {
    // $FlowIssue
    this.element = document.getElementById('portal');
  };

  render() {
    // $FlowIssue
    if (!this.element) return null;

    const { children } = this.props;

    // $FlowIssue
    return createPortal(children, this.element);
  }
}

export default Portal;
