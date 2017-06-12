import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import PostContainer from '../components/post/PostContainer';
import P from '../components/post/Paragraph';

const Index = () => (
  <div>
    <Head><title>Rack Key Concepts</title></Head>
    <Header text="Rack Key Concepts" image_url="wesson-wang-110739.jpg" date="December 7, 2016" />
    <PostContainer>
      <P>The most important thing to know about Rack and the internet is knowing how the internet works. First you have <code>HEAD</code>, <code>GET</code>, <code>POST</code>, <code>PUT</code>, <code>DELETE</code>, <code>TRACE</code>, <code>OPTIONS</code>, <code>CONNECT</code>, and <code>PATCH</code> requests. 🤔 huh? Let’s run through them.</P>

      <P><code>GET</code> requests get a resource. <code>HEAD</code> requests are <code>GET</code> requests without the body of them. <code>POST</code> requests will submit data. <code>PUT</code> will upload data. <code>DELETE</code> will, well, delete a resource. <code>TRACE</code> requests will return the recieved request. <code>OPTIONS</code> will return the HTTP methods that your server supports. <code>CONNECT</code> converts the request to a TCP/IP tunnel, ususally used for SSL. <code>PATCH</code> requests are used for partial modifications to a resource.</P>

      <P>You can see what type of requests a website is using by looking in the network tab in Dev Tools.</P>

      <P>Now onto Rack itself. Rack is a Ruby gem that provides a minimal interface that goes between a server that supports Ruby and Ruby Frameworks.</P>

      <P>To use Rack you must first make a call to a class #call. All this needs to do is return a response that contains status codes, headers, and the body. That can be done with a <code>Rack::Response</code> object:</P>

      <script src="https://gist.github.com/mcansh/dbe2f244d6b2391a77a406abd28dd710.js?file=call.rb" />

      <P>That will run whenever a request is received but you still need to set up a HTTP serve to receive that request. Using config.ru</P>

      <script src="https://gist.github.com/mcansh/dbe2f244d6b2391a77a406abd28dd710.js?file=config.ru" />

      <P>Now running <code>rackup config.ru</code> will start up your application.</P>
    </PostContainer>
  </div>
);

export default Index;
