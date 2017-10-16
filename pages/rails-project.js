import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Document from '../layouts/Document';
import Progress from '../components/post/Progress';
import Header from '../components/Header';
import PostContainer from '../components/post/PostContainer';
import { P } from '../components/post/Typography';

const title = 'Rails project';
const image = '1*Wmv8hfi_bTHuHyV5CawnCw.jpg';

const Index = () => (
  <Document>
    <Head>
      <title>{title}</title>
      <meta name="twitter:title" content={title} />
      <meta name="twitter:image" content={image} />
    </Head>
    <Header text={title} image={image} date="August 10, 2017" />
    <PostContainer>
      <Progress />
      <P>{"You're"} Probably wondering where that Rails project is eh?</P>
      <P>
        Well... the project has been{' '}
        <Link href="https://github.com/mcansh/rails-project">
          <a target="_blank">done</a>
        </Link>
        <sup>
          <Link href="#footnotes">
            <a>1</a>
          </Link>
        </sup>{' '}
        for a bit now but I never wrote a post about it.
      </P>

      <P>
        Just like my{' '}
        <Link href="/sinatra-project">
          <a>Sinatra Project</a>
        </Link>, I made a CRUD todo app, which allows you to signup for an
        account with your email or using your GitHub account. After signing up,
        you can make a new list, make new tasks, edit your list, delete your
        list, and delete your tasks. If you try accessing a list which you{' '}
        {"haven't"} made, {"you'll"} be redirected back to the previous page and
        see an error.
      </P>

      <div id="footnotes">
        <ol>
          <li>
            <P>
              done as in {"I've"} never went through the review process, but the
              app is complete.
            </P>
          </li>
        </ol>
      </div>
    </PostContainer>
    <style jsx>{`
      sup a {
        text-decoration: none;
        color: black;
      }

      #footnotes {
        font-size: 12px;
        margin-top: 50px;
      }
    `}</style>
  </Document>
);

export default Index;
