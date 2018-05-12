import React, { Fragment } from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { lighten } from 'polished';
import withData from '../lib/withData';
import Meta from '../components/Meta';
import Header from '../components/Header';
import Release from '../components/Release';

const Button = styled.button`
  border: none;
  color: white;
  padding: 1rem 2rem;
  border-radius: 2rem;
  background: ${props => props.theme.primary};
  margin: 3rem auto 0;
  display: block;
  font-size: 1.6rem;
  transition: 250ms all ease-in-out;
  cursor: pointer;

  &:hover {
    background: ${props => lighten(0.2, props.theme.primary)};
    border-radius: 1.2rem;
  }
`;

const allReleasesQuery = gql`
  query allReleases($after: String) {
    repository(owner: "mcansh", name: "blog") {
      name
      releases(
        first: 10
        after: $after
        orderBy: { field: CREATED_AT, direction: DESC }
      ) {
        edges {
          cursor
          node {
            tag {
              name
            }
            description
            publishedAt
          }
        }
      }
    }
  }
`;

const Changelog = () => (
  <Fragment>
    <Meta />
    <Header
      title="Changelog"
      image={{
        imageUrl: 'joshua-earle-234344-unsplash.jpg',
        url: 'https://unsplash.com/photos/6V19Uy-tUhs',
        name: 'Joshua Earle',
      }}
    />
    <Query query={allReleasesQuery}>
      {({ loading, error, fetchMore, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        const {
          repository: {
            releases: { edges: releases },
          },
        } = data;

        const loadMoreReleases = () => {
          const lastRelease = releases[releases.length - 1];

          fetchMore({
            variables: {
              after: lastRelease.cursor,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev;

              return {
                repository: {
                  ...prev.repository,
                  releases: {
                    ...prev.repository.releases,
                    edges: [
                      ...prev.repository.releases.edges,
                      ...fetchMoreResult.repository.releases.edges,
                    ],
                  },
                },
              };
            },
          });
        };

        return (
          <Fragment>
            {releases.map(({ node: release }) => (
              <Release
                key={release.tag.name}
                version={release.tag.name}
                notes={release.description}
                date={release.publishedAt}
              />
            ))}
            <Button onClick={loadMoreReleases}>Load More</Button>
          </Fragment>
        );
      }}
    </Query>
  </Fragment>
);

export default withData(Changelog);
