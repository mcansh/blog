import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Document from '../layouts/Document';
import Progress from '../components/post/Progress';
import Header from '../components/Header';
import PostContainer from '../components/post/PostContainer';
import P from '../components/post/Paragraph';

const Index = () => {
  const title = 'Rails Project';
  const image = 'alesia-kazantceva-283288.jpg';
  return (
    <Document>
      <Head>
        <title>{title}</title>
        <meta name="twitter:title" content={title} />
        <meta name="twitter:image" content={image} />
      </Head>
      <Header text={title} image={image} date="TBD" />
      <PostContainer>
        <Progress />

        <P>HEY!</P>

        <style jsx>{`
          a {
            color: #E53A40;
            text-decoration-skip: ink;
          }
        `}</style>
      </PostContainer>
    </Document>
  );
};

export default Index;
