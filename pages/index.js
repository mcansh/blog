import React from 'react';
import Page from '../components/layouts/Page';
import PostCard from '../components/PostCard';
import posts from '../posts.json';
import Header from '../components/Header';
import Meta from '../components/Meta';

const [latest] = posts;
const { id: latestid } = latest;

const Index = () => (
  <Page>
    <Meta />
    <Header id={latestid} link={latestid} />
    <div>
      {posts.map(({ image, date, title, id }) => (
        <PostCard key={id} image={image} date={date} title={title} id={id} />
      ))}
    </div>
    <style jsx>{`
      div {
        margin: 0 auto;
        width: 95%;
        padding: 9rem 0 0 0;
        padding-left: env(safe-area-inset-left);
        padding-right: env(safe-area-inset-right);
        padding-left: constant(safe-area-inset-left);
        padding-right: constant(safe-area-inset-right);
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
        grid-gap: 1rem;
      }
      @media (min-width: 768px) {
        div {
          max-width: 750px;
          width: auto;
        }
      }
      @media (min-width: 992px) {
        div {
          max-width: 970px;
          width: auto;
        }
      }
      @media (min-width: 1200px) {
        div {
          max-width: 1170px;
          width: auto;
        }
      }
    `}</style>
  </Page>
);

export default Index;
