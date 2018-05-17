import React, { Fragment, PureComponent } from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import InfiniteScroll from 'react-infinite-scroller';
import withData from '../lib/withData';
import Meta from '../components/Meta';
import Header from '../components/Header';
import Release from '../components/Release';

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

class Changelog extends PureComponent {
  state = {
    hasMore: true,
  };

  hasNoMore = () => this.setState({ hasMore: false });

  render() {
    const { hasMore } = this.state;
    return (
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
                  if (fetchMoreResult.repository.releases.edges.length < 10) {
                    this.hasNoMore();
                  }

                  if (!fetchMoreResult.repository.releases.edges.length) {
                    return prev;
                  }

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
              <InfiniteScroll loadMore={loadMoreReleases} hasMore={hasMore}>
                <Fragment>
                  {releases.map(({ node: release }) => (
                    <Release
                      key={release.tag.name}
                      version={release.tag.name}
                      notes={release.description}
                      date={release.publishedAt}
                    />
                  ))}
                </Fragment>
              </InfiniteScroll>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default withData(Changelog);
