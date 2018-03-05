import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import withData from '../lib/withData';
import Document from '../components/layouts/Document';
import Meta from '../components/Meta';
import Header from '../components/Header';
import Release from '../components/Release';

const allReleasesQuery = gql`
  query allReleases {
    repository(owner: "mcansh", name: "blog") {
      name
      releases(last: 100, orderBy: { field: CREATED_AT, direction: DESC }) {
        nodes {
          tag {
            name
          }
          description
          publishedAt
          isPrerelease
        }
      }
    }
  }
`;

const Changelog = () => (
  <Document>
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
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        const { repository: { releases: { nodes } } } = data;
        return nodes.map(release => (
          <Release
            key={release.tag.name}
            version={release.tag.name}
            notes={release.description}
            date={release.publishedAt}
            isPrerelease={release.isPrerelease}
          />
        ));
      }}
    </Query>
  </Document>
);

export default withData(Changelog);
