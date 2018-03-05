import React from 'react';
import PropTypes from 'prop-types';
import Document from './Document';

const Post = ({ children }) => (
  <Document>
    {children}
    <style jsx global>{`
      ._markdown_ {
        margin: 3rem auto 0 auto;
        max-width: 90rem;
        width: 95%;
        min-height: calc(100vh - 50rem);
        padding: 0 env(safe-area-inset-right) 0 env(safe-area-inset-left);
        padding: 0 constant(safe-area-inset-right) 0
          constant(safe-area-inset-left);
      }
    `}</style>
  </Document>
);

Post.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Post;
