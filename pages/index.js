import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import { posts } from '../posts.json';
import PostCard from '../components/PostCard';

const Index = () => (
  <div>
    <Head><title>Logan McAnsh</title></Head>
    <Header text="Logan McAnsh" image_url="wesson-wang-110739.jpg" />
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
  </div>
);

export default Index;
