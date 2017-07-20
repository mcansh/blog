import React from 'react';
import Head from 'next/head';
import Document from '../layouts/Document';
import Code from '../components/post/Code';
import Progress from '../components/post/Progress';
import Header from '../components/Header';
import PostContainer from '../components/post/PostContainer';
import P from '../components/post/Paragraph';

const Index = () => {
  const title = 'JavaScript Classes Key Concepts';
  const image = 'olu-eletu-134760.jpg';
  return (
    <Document>
      <Head>
        <title>{title}</title>
        <meta name="twitter:title" content={title} />
        <meta name="twitter:image" content={`/static/images/${image}`} />
      </Head>
      <Header text={title} image={image} date="November 21, 2016" />
      <PostContainer>
        <Progress />

        <P>The key concept in class variables and methods is how to define them. Classes are realistically just “special functions”. To define a class, you use the keyword class followed by the name you want to give it.</P>

        <Code>{`
    class myClass {
      constructor(height, width) {
        this.height = height;
        this.width = width;
      }
    }
        `}</Code>

        <P>When you’re defining classes make sure they are hoisted or your code will throw errors like</P>

        <Code>{`
    var p = new myClass(); // ReferenceError
    class myClass {}
        `}</Code>

        <P>It should be known that the content of a class declaration is executed in strict mode.</P>
      </PostContainer>
    </Document>
  );
};

export default Index;
