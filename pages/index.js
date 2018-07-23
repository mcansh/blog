import React, { Fragment } from 'react';
import styled from 'styled-components';
import PostCard from '../components/PostCard';
import posts from '../posts.json';
import Header from '../components/Header';

const [latest] = posts;
const { id: latestid } = latest;

const PostsWrapper = styled.div`
  margin: 0 auto;
  width: 95%;
  padding: 9rem 0 0 0;
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
  padding-left: constant(safe-area-inset-left);
  padding-right: constant(safe-area-inset-right);
  display: flex;
  flex-flow: row wrap;

  @supports (display: grid) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
    grid-gap: 2rem;
  }

  @media (min-width: 768px) {
    max-width: 750px;
    width: auto;
  }
  @media (min-width: 992px) {
    max-width: 970px;
    width: auto;
  }
  @media (min-width: 1200px) {
    max-width: 1170px;
    width: auto;
  }
`;

const Index = () => (
  <Fragment>
    <Header id={latestid} link={latestid} />
    <PostsWrapper>
      {posts
        .sort((a, b) => (a.date > b.date ? -1 : 1))
        .map(({ image, date, title, id }) => (
          <PostCard key={id} image={image} date={date} title={title} id={id} />
        ))}
    </PostsWrapper>
  </Fragment>
);

export default Index;
