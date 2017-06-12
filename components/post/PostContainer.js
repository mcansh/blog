import React from 'react';
import PropTypes from 'prop-types';

const PostContainer = props => (
  <div className="container">
    {props.children}
    <style jsx>{`
      .container {
        margin: 0 auto;
        width: 95%;
        padding: 30px 0;
      }
      @media (min-width: 768px) {
        .container {
          max-width: 750px;
          width: auto;
        }
      }
      @media (min-width: 992px) {
        .container {
          max-width: 970px;
          width: auto;
        }
      }
      @media (min-width: 1200px) {
        .container {
          max-width: 1170px;
          width: auto;
        }
      }
    `}</style>
  </div>
);

PostContainer.propTypes = {
  children: PropTypes.node.isRequired
};

export default PostContainer;
