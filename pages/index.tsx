import React from 'react';
import styled from 'styled-components';
import PostCard from '~/components/PostCard';
import posts from '~/posts';
import Header from '~/components/Header';

const sortedPosts = posts.sort((a, b) => {
  if (a.date > b.date) return -1;
  if (a.date < b.date) return 1;
  return 0;
});

const [latest] = sortedPosts;
const { date, ...latestPost } = latest;

const PostsWrapper = styled.div`
  margin: 0 auto;
  width: 95%;
  padding-top: 9rem;
  display: flex;
  flex-flow: row wrap;

  @supports (display: grid) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
    grid-gap: 3.6rem;
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
  <>
    <Header {...latestPost} />
    <PostsWrapper>
      {sortedPosts.map(post => (
        <PostCard key={post.url} {...post} />
      ))}
    </PostsWrapper>
  </>
);

export default Index;
