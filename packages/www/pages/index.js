// @flow
import React from 'react';
import Posts from '../components/Posts';
import Header from '../components/Header';
import posts from '../posts.json';

const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
const [latest] = sortedPosts;

const Index = () => (
  <>
    <Header {...latest} noDate link={`/${latest.id}`} />
    <Posts posts={sortedPosts} />
  </>
);

export default Index;
