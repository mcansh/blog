import React from 'react';
import PropTypes from 'prop-types';
import Page from './Page';

const Post = ({ children }) => (
  <Page>
    {children}
    <style jsx global>{`
      ._markdown_ {
        margin: 3rem auto 0 auto;
        max-width: 900px;
        width: 95%;
        min-height: calc(100vh - 500px);
        padding: 0 env(safe-area-inset-right) 0 env(safe-area-inset-left);
        padding: 0 constant(safe-area-inset-right) 0
          constant(safe-area-inset-left);
      }
    `}</style>
  </Page>
);

Post.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Post;
