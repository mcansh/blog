import React from 'react';
import Document from '../layouts/Document';
import Code from '../components/post/Code';
import Progress from '../components/post/Progress';
import Header from '../components/Header';
import PostContainer from '../components/post/PostContainer';
import { P } from '../components/post/Typography';

const Index = () => {
  const title = 'Rack key concepts';
  const image = 'michail-sapiton-234263.jpg';
  return (
    <Document title={title} image={image}>
      <Header text={title} image={image} date="December 7, 2016" />
      <PostContainer>
        <Progress />

        <P>
          The most important thing to know about Rack and the internet is
          knowing how the internet works. First you have <code>HEAD</code>,{' '}
          <code>GET</code>, <code>POST</code>, <code>PUT</code>,{' '}
          <code>DELETE</code>, <code>TRACE</code>, <code>OPTIONS</code>,{' '}
          <code>CONNECT</code>, and <code>PATCH</code> requests. 🤔 huh? Let’s
          run through them.
        </P>

        <P>
          <code>GET</code> requests get a resource. <code>HEAD</code> requests
          are <code>GET</code> requests without the body of them.{' '}
          <code>POST</code> requests will submit data. <code>PUT</code> will
          upload data. <code>DELETE</code> will, well, delete a resource.{' '}
          <code>TRACE</code> requests will return the recieved request.{' '}
          <code>OPTIONS</code> will return the HTTP methods that your server
          supports. <code>CONNECT</code> converts the request to a TCP/IP
          tunnel, ususally used for SSL. <code>PATCH</code> requests are used
          for partial modifications to a resource.
        </P>

        <P>
          You can see what type of requests a website is using by looking in the
          network tab in Dev Tools.
        </P>

        <P>
          Now onto Rack itself. Rack is a Ruby gem that provides a minimal
          interface that goes between a server that supports Ruby and Ruby
          Frameworks.
        </P>

        <P>
          To use Rack you must first make a call to a class #call. All this
          needs to do is return a response that contains status codes, headers,
          and the body. That can be done with a <code>Rack::Response</code>{' '}
          object:
        </P>

        <Code>{`
    # call.rb

    class Application
      def call(env)
        resp = Rack::Response.new
        resp.write "Hello, World"
        resp.finish
      end
    end
        `}</Code>

        <P>
          That will run whenever a request is received but you still need to set
          up a HTTP serve to receive that request. Using config.ru
        </P>

        <Code>{`
    # config.ru

    require_relative "./application.rb"
    run Application.new
        `}</Code>

        <P>
          Now running <code>rackup config.ru</code> will start up your
          application.
        </P>
      </PostContainer>
    </Document>
  );
};

export default Index;
