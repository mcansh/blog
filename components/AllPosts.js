import React from 'react';
import PropTypes, { shape } from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import PostCard from './PostCard';

const AllPosts = ({ data: { allPosts } }) => (
  <div className="container">
    {allPosts.map(({ id, title, slug, image, createdAt }) => (
      <PostCard
        key={id}
        href={slug}
        title={title}
        image={image}
        date={createdAt}
      />
    ))}
  </div>
);

const allPosts = gql`
  query allPosts($first: Int!) {
    allPosts(
      orderBy: createdAt_DESC
      first: $first
      filter: { published: true }
    ) {
      id
      title
      slug
      body
      image
      createdAt
    }
  }
`;

AllPosts.propTypes = {
  data: shape({
    allPosts: PropTypes.array,
  }).isRequired,
};

export default graphql(allPosts, {
  options: {
    variables: {},
  },
  props: ({ data }) => ({
    data,
  }),
})(AllPosts);
