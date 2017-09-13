import React from 'react';
import Link from 'next/link';
import Document from '../layouts/Document';
import Progress from '../components/post/Progress';
import Header from '../components/Header';
import PostContainer from '../components/post/PostContainer';
import { P } from '../components/post/Typography';

const Index = () => {
  const title = 'Sinatra Project';
  const image = 'farzad-nazifi-71686.jpg';
  return (
    <Document title={title} image={image}>
      <Header text={title} image={image} date="April 15, 2017" />
      <PostContainer>
        <Progress />

        <P>Long time no see! It’s time to talk about my <Link href="https://github.com/mcansh/sinatra-project"><a target="_blank" rel="external noopener">sinatra portfolio project</a></Link> for Learn.co! I’m not exactly sure what I need to talk about, so maybe just a quick run through..</P>

        <P>The first thing you’re greated with is a simple homepage with a link to sign up. Clicking that takes you to a form which you’ll fill out a username, email, and password. Filling out that and submitted, granted there’s no errors, you’ll be greated with a list of your Tasks, which you dont have yet, so maybe I’ll update and put a link there to make a new one. Clicking the button in the bottom right hand corner will take you to a page to make a new Task. Doing so will give you the option for a title and marking it as complete if you completed and just wanted the satisfaction of writing it down. Creating the task will take you back to the homepage, and now you should have that task in your list of Tasks. Clicking on the one you just made will give you the option to edit or delete that task. Editing the task will look very similar to what you just saw when you created one. If you mark it as complete, the task will be crossed out on your list. Deleting the task will delete it and take you back to your homepage.</P>

        <P>That’s all for now <span role="img" aria-label="Wave Emoji">👋</span></P>
      </PostContainer>
    </Document>
  );
};

export default Index;
