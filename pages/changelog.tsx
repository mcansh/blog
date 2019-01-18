import React, { useState } from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
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

const Changelog = () => {
  const [hasMore, setHasMore] = useState(true);
  const { data, loading, error, fetchMore } = useQuery(allReleasesQuery, {
    suspend: false,
  });

  if (loading) {
    return (
      <>
        <Meta />
        <Header
          title="Changelog"
          image={{
            imageUrl: 'justin-mcafee-656012-unsplash.jpg',
            url: 'https://unsplash.com/photos/QsMXXeeCxoU',
            photographer: 'Justin McAfee',
          }}
        />
        <QueryErrorStyles>
          <p>Loading...</p>
        </QueryErrorStyles>
      </>
    );
  }

  if (error) {
    Sentry.captureException(error);
    return (
      <>
        <Meta />
        <Header
          title="Changelog"
          image={{
            imageUrl: 'justin-mcafee-656012-unsplash.jpg',
            url: 'https://unsplash.com/photos/QsMXXeeCxoU',
            photographer: 'Justin McAfee',
          }}
        />
        <QueryErrorStyles>
          <p>Error :(</p>
        </QueryErrorStyles>
      </>
    );
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
          setHasMore(false);
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
    <>
      <InfiniteScroll
        loadMore={loadMoreReleases}
        hasMore={hasMore}
        threshold={500}
        loader={
          <div
            className="loader"
            key={0}
            css={`
              margin: 0 auto;
              text-align: center;
              font-size: 1.6rem;
            `}
          >
            Loading releases...
          </div>
        }
      >
        <Meta />
        <Header
          title="Changelog"
          image={{
            imageUrl: 'justin-mcafee-656012-unsplash.jpg',
            url: 'https://unsplash.com/photos/QsMXXeeCxoU',
            photographer: 'Justin McAfee',
          }}
        />
        {releases.map(({ node: release }) => (
          <Release
            key={release.tag.name}
            version={release.tag.name}
            notes={release.description}
            date={release.publishedAt}
          />
        ))}
      </InfiniteScroll>
    </>
  );
};

export default Changelog;
