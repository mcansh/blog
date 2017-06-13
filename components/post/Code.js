import React from 'react';
import PropTypes from 'prop-types';

const Code = props => (
  <pre>
    { props.children }
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
