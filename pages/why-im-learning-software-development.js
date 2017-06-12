import React from 'react';
import Head from 'next/head';
import Progress from '../components/post/Progress';
import Header from '../components/Header';
import PostContainer from '../components/post/PostContainer';
import P from '../components/post/Paragraph';

const Index = () => (
  <div>
    <Head><title>{"Why I'm Learning Software Development"}</title></Head>
    <Header text="Why I'm Learning Software Development" image_url="wesson-wang-110739.jpg" date="October 3, 2016" />
    <PostContainer>
      <Progress />

      <P>This is my first attempt at blogging, so I am sorry that this is ~7 days late. To be 100% honest with you, I don’t know my true reason for wanting to learn software development. Something about seeing what you made by typing away on a keyboard brings a warm fuzzy sensation to me. I took a web development class in high school, that was about 3 years ago, and I’ve been hooked ever since. I make a website for anything I possibly can.</P>

      <P>This blogging thing is getting easier even after writing one paragraph, maybe I can do this. I didn’t learn to code to make money, though that is a nice outcome from it, I did it because it’s fucking awesome to be able to see something you made just a short time ago. Coding teaches you patience and a knowledgable way to find solutions. You will get stuck, but you will get past what was holding you back.</P>

      <P>This was a short one I know, hopefully the next one will make up for it.</P>

      <P>— Logan</P>
    </PostContainer>
  </div>
);

export default Index;
