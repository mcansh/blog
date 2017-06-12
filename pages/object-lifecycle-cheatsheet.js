import React from 'react';
import Head from 'next/head';
import Progress from '../components/post/Progress';
import Header from '../components/Header';
import PostContainer from '../components/post/PostContainer';
import P from '../components/post/Paragraph';

const Index = () => (
  <div>
    <Head><title>Object Lifecycle Cheatsheet</title></Head>
    <Header text="Object Lifecycle Cheatsheet" image_url="wesson-wang-110739.jpg" date="November 4, 2016" />
    <PostContainer>
      <Progress />

      <P>Firstly, I’d like to apolagize for the lack and timing of these posts. I’ve been busy at work and unfortunately haven’t had the time to write them <span role="img" aria-label="Sob Emoji">😭</span>.</P>

      <P>A Javascript object is a standalone entity, with properties and types associated with it. Object properties are basically the same as javascript variables except for they’re attached to objects.</P>

      <P>You define a propterty by defining it a value, for example:</P>

      <script src="https://gist.github.com/mcansh/49516fe25bcb4bae1213f2eda906f899.js?file=newObject.js" />

      <P>If you define a property but don’t give it a value it becomes undefined, not null. e.g: <code>myCar.color;</code> would return undefined.</P>

      <P>You can also use bracket notation to iterate over all the properties of an object. e.g:</P>

      <script src="https://gist.github.com/mcansh/49516fe25bcb4bae1213f2eda906f899.js?file=bracketNotation.js" />

      <P>You can also do if else statements with objects:</P>

      <script src="https://gist.github.com/mcansh/49516fe25bcb4bae1213f2eda906f899.js?file=if.js" />

      <P>You can even have an object inside another object:</P>

      <script src="https://gist.github.com/mcansh/49516fe25bcb4bae1213f2eda906f899.js?file=nestedObjects.js" />

      <P>Alternatively you can make an object with a constructor function:</P>

      <script src="https://gist.github.com/mcansh/49516fe25bcb4bae1213f2eda906f899.js?file=constructor.js" />
    </PostContainer>
  </div>
);

export default Index;
