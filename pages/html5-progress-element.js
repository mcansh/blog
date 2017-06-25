import React from 'react';
import Head from 'next/head';
import Document from '../layouts/Document';
import Progress from '../components/post/Progress';
import Header from '../components/Header';
import { H1 } from '../components/post/Heading';
import PostContainer from '../components/post/PostContainer';
import P from '../components/post/Paragraph';
import Code from '../components/post/Code';

const Index = () => {
  const title = 'The HTML5 Progress Element is Great for Blogs';
  const image = 'wesson-wang-110739.jpg';
  return (
    <Document>
      <Head>
        <title>{title}</title>
        <meta name="twitter:title" content={title} />
        <meta name="twitter:image" content={`/static/images/${image}`} />
      </Head>
      <Header text={title} image={image} date="October 14, 2016" />
      <PostContainer>
        <Progress />

        <P>Something I’ve learned that wasn’t included in the Learn curriculum was the <code>{'<progress>'}</code> element. Now what that does is show the progress of a task. In the case of this page. It shows how far down the page a user has scrolled. This can be beneficial to a long webpage such as a blog post. Another reason one could use the <code>{'<progress>'}</code> element is to show a loading bar for something.</P>

        <H1>{"The HTML is pretty simple in itself, just set a max value and you're done"}</H1>
        <Code>{`
    <body>
      <progress value="0" max="100"></progress>
      { content }
    </body>
        `}</Code>

        <H1>The CSS is straight forward as well but you have to remember to also clear out some vendor prefixed psuedo elements on the progress bar</H1>
        <Code>{`
    progress::-webkit-progress-bar {
      background-color: transparent;
    }

    progress::-webkit-progress-value {
      background-color: salmon;
      // or you can do gradients 💯
      background-image: linear-gradient(135deg, #52E5E7 0%, #130CB7 100%);
    }

    progress::-moz-progress-bar {
      background-color: salmon;
      // or you can do gradients 💯
      background-image: linear-gradient(135deg, #52E5E7 0%, #130CB7 100%);
    }

    progress {
      /* Positioning */
      position: fixed;
      left: 0;
      top: 0;
      z-index: 2;
      /* Dimensions */
      width: 100%;
      height: 3px;
      /* Reset the appearance */
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }
        `}</Code>

        <H1>And now the fun part, setting the value based on your scroll distance</H1>
        <Code>{`
    function youReadThisMuch() {
      const scroll = window.pageYOffset; // window.scrollY isnt supported in IE
      const bodyHeight = document.body.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollPercent = (scroll / (bodyHeight - windowHeight)) * 100;
      document.querySelector('progress').value = scrollPercent;
    }

    window.addEventListener('scroll', youReadThisMuch);
        `}</Code>
      </PostContainer>
    </Document>
  );
};

export default Index;
