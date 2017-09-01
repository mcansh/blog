import React from 'react';
import Document from '../layouts/Document';
import Header from '../components/Header';
import { posts } from '../posts.json';
import PostCard from '../components/PostCard';

class Index extends React.Component {
  componentDidMount() {
    if (process.env.NODE_ENV !== 'development') {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            // eslint-disable-next-line no-console
            console.log('service worker registration successful', registration.active);
          })
          .catch((err) => {
            // eslint-disable-next-line no-console
            console.warn('service worker registration failed', err.message);
          });
      }
    }
  }

  render() {
    const pageTitle = 'Logan McAnsh';
    const newestPost = posts[0];
    return (
      <Document title={pageTitle}>
        <Header text={newestPost.title} image={newestPost.image} slug={newestPost.slug} />
        <div className="container">
          {posts.map(({ image, date, title, slug }) => (
            <PostCard key={slug} href={slug} title={title} image={image} date={date} />
          ))}
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
          }
        `}</style>
      </Document>
    );
  }
}

export default Index;
