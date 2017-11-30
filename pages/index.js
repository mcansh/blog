import React from 'react';
import PropTypes from 'prop-types';
import Page from '../components/layouts/Page';
import PostCard from '../components/PostCard';
import posts from '../posts.json';
import Header from '../components/Header';
import Meta from '../components/Meta';

const [latest] = posts;
const { id: latestid } = latest;

const Index = ({ supportsWebp }) => (
  <Page>
    <Meta />
    <Header id={latestid} link={latestid} />
    <div>
      {posts.map(({ image, date, title, id }) => (
        <PostCard
          key={id}
          image={image}
          date={date}
          title={title}
          id={id}
          supportsWebp={supportsWebp}
        />
      ))}
    </div>
    <style jsx>{`
      div {
        margin: 0 auto;
        width: 95%;
        padding: 90px 0 0 0;
        padding-left: env(safe-area-inset-left);
        padding-right: env(safe-area-inset-right);
        padding-left: constant(safe-area-inset-left);
        padding-right: constant(safe-area-inset-right);
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
      @supports (display: grid) {
        div {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-gap: 10px;
        }
        @media (max-width: 999px) {
          div {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 550px) {
          div {
            grid-template-columns: 1fr;
          }
        }
      }
    `}</style>
  </Page>
);

Index.getInitialProps = async ({ req }) => {
  const { headers: { accept } } = req;
  const webp = 'image/webp';
  const supportsWebp = accept.includes(webp);
  return { supportsWebp };
};

Index.propTypes = {
  supportsWebp: PropTypes.bool.isRequired,
};

export default Index;
