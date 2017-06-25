import React from 'react';
import PropTypes from 'prop-types';

const Code = props => (
  <pre>
    <code>{ props.children }</code>
    <style jsx>{`
      pre {
        overflow-x: scroll;
        background: white;
      }
    `}</style>
  </pre>
);

Code.propTypes = {
  children: PropTypes.node.isRequired
};

export default Code;
