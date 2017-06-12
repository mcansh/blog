import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Progress from '../components/post/Progress';
import Header from '../components/Header';
import PostContainer from '../components/post/PostContainer';
import P from '../components/post/Paragraph';

const Index = () => (
  <div>
    <Head>
      <title>How To Convert The Current Time To A Hexadecimal</title>
      <link rel="stylesheet" href="https://highlightjs.org/static/demo/styles/railscasts.css" />
    </Head>
    <Header text="How To Convert The Current Time To A Hexadecimal" image_url="wesson-wang-110739.jpg" date="January 10, 2017" />
    <PostContainer>
      <Progress />

      <P>It’s actually really easy, <Link href="https://mcansh.github.io/WhatColorIsIt/"><a>Demo</a></Link>.</P>

      <P>This is a pretty basic one function website, the function runs every second and takes the time in military time and then outputs that as a hex, while changing the background color to it.</P>

      <script src="https://gist.github.com/mcansh/ffd38259a8f62a70ddb877cef7b3ebad.js?file=setDate.js" />

      <P>Not so fast, you’re not done yet! Notice when the time is 9:03:03 or any time thats less than 10, the hex is only then 3 numbers, which is fine, until you get 4 or 5 digits. So to resolve this you can adjust the function like so:</P>

      <script src="https://gist.github.com/mcansh/ffd38259a8f62a70ddb877cef7b3ebad.js?file=setDate-final.js" />

      <P>Now what that’s doing is running a tenerary to see if the time is less than 10 or not, if it is, then it prepends a 0 to the variable. You probably also noticed that we’re never calling <code>setDate()</code>.</P>

      <P>Woohoo! You now have a clock that shows you hexadecimal colors. You can even change the android chrome theme color every second.</P>

      <script src="https://gist.github.com/mcansh/ffd38259a8f62a70ddb877cef7b3ebad.js?file=setThemeColor.js" />

      <style jsx>{`
        a {
          color: #E53A40;
          text-decoration-skip: ink;
        }
      `}</style>
    </PostContainer>
  </div>
);

export default Index;
