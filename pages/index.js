import React from 'react';
import Document from '../layouts/Document';
import Header from '../components/Header';
// import { posts } from '../posts.json';
import withData from '../lib/withData';
import AllPosts from '../components/AllPosts';

const Index = () => {
  const pageTitle = 'Logan McAnsh';
  const pageImage = 'me.png';
  // const [newestPost] = posts;
  return (
    <Document title={pageTitle} image={pageImage}>
      {/* <Header
        text={newestPost.title}
        image={newestPost.image}
        slug={newestPost.slug}
      /> */}
      <div className="container">
        <AllPosts />
      </div>
      <style jsx>{`
        .container {
          margin: 0 auto;
          width: 95%;
          padding: 90px 0 0 0;
        }
        @media (min-width: 768px) {
          .container {
            max-width: 750px;
            width: auto;
          }
        }
        @media (min-width: 992px) {
          .container {
            max-width: 970px;
            width: auto;
          }
        }
        @media (min-width: 1200px) {
          .container {
            max-width: 1170px;
            width: auto;
          }
        }

        @supports (display: grid) {
          .container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 10px;
          }
          @media (max-width: 999px) {
            .container {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (max-width: 550px) {
            .container {
              grid-template-columns: 1fr;
            }
          }
        }
      `}</style>
    </Document>
  );
};

export default withData(Index);
