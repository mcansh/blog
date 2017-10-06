import React from 'react';
import Document from '../layouts/Document';
import Progress from '../components/post/Progress';
import Header from '../components/Header';
import PostContainer from '../components/post/PostContainer';
import { P } from '../components/post/Typography';

const Index = () => {
  const title = 'Similarities Between Life And Code';
  const image = 'markus-spiske-109588.jpg';
  return (
    <Document title={title} image={image}>
      <Header text={title} image={image} date="December 25, 2016" />
      <PostContainer>
        <Progress />

        <P>Ahhh, this question. Ready? Good, let’s go.</P>

        <P>
          Learning to code is like learning anything in life, it takes practice.
          At the beginning you may feel uncomfortable or like you don’t think
          you know what you’re doing. That’s actually somewhat of a good thing.
          As long as you keep practicing you’ll become great. Practice makes
          perfect. I’m sure you couldn’t ride a bike on the first attempt
          either, same thing with coding. After a bit of practice you could ride
          that bike no problem, same concept applies here. Keep on hacking.
        </P>

        <P>
          Yeah, I know, another short post *sigh*. Who knows maybe I’ll keep
          this blogging thing up and going and get better. *gasp* The same
          process can be made with coding and blogging{' '}
          <span role="img" aria-label="Scream Emoji">
            😱
          </span>.
        </P>
      </PostContainer>
    </Document>
  );
};

export default Index;
