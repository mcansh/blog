import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import PostContainer from '../components/post/PostContainer';
import P from '../components/post/Paragraph';

const Index = () => (
  <div>
    <Head><title>The HTML5 Progress Element is great for blogs</title></Head>
    <Header text="The HTML5 Progress Element is great for blogs" image_url="wesson-wang-110739.jpg" date="October 14, 2016" />
    <PostContainer>
      <P>Something I’ve learned that wasn’t included in the Learn curriculum was the <code>{'<progress>'}</code> element. Now what that does is show the progress of a task. In the case of this page. It shows how far down the page a user has scrolled. This can be beneficial to a long webpage such as a blog post. Another reason one could use the <code>{'<progress>'}</code> element is to show a loading bar for something.</P>

      <script src="https://gist.github.com/mcansh/0dec1ed8286a4fe890607d3038a9d152.js" />
    </PostContainer>
  </div>
);

export default Index;
