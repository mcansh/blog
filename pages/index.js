import React from 'react';
// import Layout from './Layout';
import Header from '../components/Header';
import Posts from './_posts';
import PostCard from '../components/PostCard';

const Index = () => (
  <div>
    <Header text="Logan McAnsh" image_url="wesson-wang-110739.jpg" />
    <div className="container">
      {Posts().map(post => (
        <PostCard key={post.link} href={post.link} title={post.title} image_url={post.image_url} date={post.date} />
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
