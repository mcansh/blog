import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import PostContainer from '../components/post/PostContainer';
import P from '../components/post/Paragraph';

const Index = () => (
  <div>
    <Head><title>Javascript Classes Key Concepts</title></Head>
    <Header text="Javascript Classes Key Concepts" image_url="wesson-wang-110739.jpg" date="November 21, 2016" />
    <PostContainer>
      <P>The key concept in class variables and methods is how to define them. Classes are realistically just “special functions”. To define a class, you use the keyword class followed by the name you want to give it.</P>

      <script src="https://gist.github.com/mcansh/babfe22d05d8d7e5f6401f7ee6e1d558.js?file=class.js" />

      <P>When you’re defining classes make sure they are hoisted or your code will throw errors like</P>

      <script src="https://gist.github.com/mcansh/babfe22d05d8d7e5f6401f7ee6e1d558.js?file=hoisted.js" />

      <P>It should be known that the content of a class declaration is executed in strict mode.</P>
    </PostContainer>
  </div>
);

export default Index;
