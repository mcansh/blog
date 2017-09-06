import React from 'react';
// import Link from 'next/link';
import Head from 'next/head';
import Document from '../layouts/Document';
import Progress from '../components/post/Progress';
import Header from '../components/Header';
import PostContainer from '../components/post/PostContainer';
import { H1, P } from '../components/post/Typography';

const Index = () => {
  const title = 'Rails Project';
  const image = '1*Wmv8hfi_bTHuHyV5CawnCw.jpg';
  return (
    <Document>
      <Head>
        <title>{title}</title>
        <meta name="twitter:title" content={title} />
        <meta name="twitter:image" content={`/static/images/${image}`} />
      </Head>
      <Header text={title} image={image} date="August 10, 2017" />
      <PostContainer>
        <Progress />
        <H1>Oh Rails....</H1>
      </PostContainer>
    </Document>
  );
};

export default Index;
