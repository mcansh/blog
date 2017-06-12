import React from 'react';
import PropTypes from 'prop-types';
import Layout from './Layout';
import Progress from '../components/post/Progress';

const PostLayout = ({ children }) => (
  <Layout>
    <Progress />
    {children}
  </Layout>
);

PostLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default PostLayout;
