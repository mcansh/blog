import React from 'react';
import Head from 'next/head';
import Document from '../layouts/Document';
import Header from '../components/Header';
import { posts } from '../posts.json';
import PostCard from '../components/PostCard';

const Index = () => {
  const pageTitle = 'Logan McAnsh';
  const randomPost = posts[Math.floor(Math.random() * posts.length)];
  return (
    <Document>
      <Head><title>{pageTitle}</title></Head>
      <Header text={randomPost.title} image={randomPost.image} link={randomPost.link} />
      <div className="container">
        {posts.map(({ image, date, title, link }) => (
          <PostCard key={link} href={link} title={title} image={image} date={date} />
        ))}
      </div>
      <style jsx>{`
        .container {
          margin: 0 auto;
          width: 95%;
          padding: 90px 0;
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
      `}</style>
    </Document>
  );
};

export default Index;
