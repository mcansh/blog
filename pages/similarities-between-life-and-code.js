import React from 'react';
import Head from 'next/head';
import PostLayout from './PostLayout';
import Header from '../components/Header';
import PostContainer from '../components/post/PostContainer';
import P from '../components/post/Paragraph';

const Index = () => (
  <PostLayout>
    <Head><title>Similarities Between Life And Code</title></Head>
    <Header text="Similarities Between Life And Code" image_url="wesson-wang-110739.jpg" date="December 25, 2016" />
    <PostContainer>
      <P>Ahhh, this question. Ready? Good, let’s go.</P>

      <P>Learning to code is like learning anything in life, it takes practice. At the beginning you may feel uncomfortable or like you don’t think you know what you’re doing. That’s actually somewhat of a good thing. As long as you keep practicing you’ll become great. Practice makes perfect. I’m sure you couldn’t ride a bike on the first attempt either, same thing with coding. After a bit of practice you could ride that bike no problem, same concept applies here. Keep on hacking.</P>

      <P>Yeah, I know, another short post *sigh*. Who knows maybe I’ll keep this blogging thing up and going and get better. *gasp* The same process can be made with coding and blogging <span role="img" aria-label="Scream Emoji">😱</span>.</P>
    </PostContainer>
  </PostLayout>
);

export default Index;
