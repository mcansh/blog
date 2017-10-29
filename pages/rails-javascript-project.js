import React from 'react';
import Link from 'next/link';
import Document from '../layouts/Document';
import Progress from '../components/post/Progress';
import Header from '../components/Header';
import PostContainer from '../components/post/PostContainer';
import Code from '../components/post/Code';
import { P } from '../components/post/Typography';

const title = 'Rails project with javascript';
const image = 'joshua-sortino-228788.jpg';

const Index = () => (
  <Document title={title} image={image}>
    <Header text={title} image={image} date={1508114031530} />
    <PostContainer>
      <Progress />
      <P>
        Based on my{' '}
        <Link href="/rails-project" prefetch>
          <a>rails project</a>
        </Link>
        {', '}
        this continues with that app and takes it a step farther, allowing you
        to interact with it, without having to wait for the browser to finish
        doing its requests. This is done via ajax and the{' '}
        <Link href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API">
          <a>fetch browser api</a>
        </Link>. The fetch api allows you to do xmlhttprequest, but with a nicer
        syntax, for example to to get info about my GitHub account, you just
        need to run the following
      </P>
      <Code>{`
  fetch('https://api.github.com/users/mcansh').then(r => r.json())
      `}</Code>
      <P>
        The above will turn the blob of data into JSON as fetch {"doesn't"}{' '}
        assume you want JSON.
      </P>
    </PostContainer>
  </Document>
);

export default Index;
