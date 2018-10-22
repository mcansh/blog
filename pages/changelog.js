// @flow
import * as React from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import InfiniteScroll from 'react-infinite-scroller';
import * as Sentry from '@sentry/browser';
import Meta from '../components/Meta';
import Header from '../components/Header';
import Release from '../components/Release';

const QueryErrorStyles = styled.div`
  height: 50vh;
  text-align: center;
  margin-top: 2rem;
  font-size: 2rem;
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

type State = {
  hasMore: boolean,
};

class Changelog extends React.PureComponent<null, State> {
  state = {
    hasMore: true,
  };

  hasNoMore = () => this.setState({ hasMore: false });

  render() {
    const { hasMore } = this.state;
    return (
      <>
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
            if (loading)
              return (
                <QueryErrorStyles>
                  <p>Loading...</p>
                </QueryErrorStyles>
              );

            if (error) {
              Sentry.captureException(error);
              return (
                <QueryErrorStyles>
                  <p>Error :(</p>
                </QueryErrorStyles>
              );
            }

            const {
              // $FlowIssue
              repository: {
                // $FlowIssue
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
                  // $FlowIssue
                  if (fetchMoreResult.repository.releases.edges.length < 10) {
                    this.hasNoMore();
                  }

                  // $FlowIssue
                  if (!fetchMoreResult.repository.releases.edges.length) {
                    return prev;
                  }

                  return {
                    repository: {
                      ...prev.repository,
                      releases: {
                        ...prev.repository.releases,
                        edges: [
                          // $FlowIssue
                          ...prev.repository.releases.edges,
                          // $FlowIssue
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
                <>
                  {releases.map(({ node: release }) => (
                    <Release
                      key={release.tag.name}
                      version={release.tag.name}
                      notes={release.description}
                      date={release.publishedAt}
                    />
                  ))}
                </>
              </InfiniteScroll>
            );
          }}
        </Query>
      </>
    );
  }
}

export default Changelog;
