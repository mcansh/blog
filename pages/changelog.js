// @flow
import React, { Fragment, PureComponent } from 'react';
import type { Node } from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import InfiniteScroll from 'react-infinite-scroller';
import * as Sentry from '@sentry/browser';
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

type State = {
  hasMore: boolean,
};

class Changelog extends PureComponent<null, State> {
  state = {
    hasMore: true,
  };

  hasNoMore = () => this.setState({ hasMore: false });

  render(): Node {
    const { hasMore } = this.state;
    return (
      <Fragment>
        <Meta />
        <Header
          title="Changelog"
          image={{
            imageUrl: 'justin-mcafee-656012-unsplash.jpg',
            url: 'https://unsplash.com/photos/QsMXXeeCxoU',
            name: 'Justin McAfee',
          }}
        />
        <Query query={allReleasesQuery}>
          {({ loading, error, fetchMore, data }) => {
            if (loading) return <p>Loading...</p>;

            if (error) {
              Sentry.captureException(error);
              return <p>Error :(</p>;
            }

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
              <InfiniteScroll
                loadMore={loadMoreReleases}
                hasMore={hasMore}
                threshold={500}
              >
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

export default Changelog;
