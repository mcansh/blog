import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Post = ({ children }) => (
  <Fragment>
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
  </Fragment>
);

Post.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Post;
