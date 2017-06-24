import React from 'react';
import Head from 'next/head';
import Document from '../layouts/Document';
import Code from '../components/post/Code';
import Progress from '../components/post/Progress';
import Header from '../components/Header';
import PostContainer from '../components/post/PostContainer';
import P from '../components/post/Paragraph';

const Index = () => {
  const title = 'Object Lifecycle Cheatsheet';
  const image = 'farzad-nazifi-71686.jpg';
  return (
    <Document>
      <Head>
        <title>{title}</title>
        <meta name="twitter:title" content={title} />
        <meta name="twitter:image" content={image} />
      </Head>
      <Header text={title} image={image} date="November 4, 2016" />
      <PostContainer>
        <Progress />

        <P>Firstly, I’d like to apolagize for the lack and timing of these posts. I’ve been busy at work and unfortunately haven’t had the time to write them <span role="img" aria-label="Sob Emoji">😭</span>.</P>

        <P>A Javascript object is a standalone entity, with properties and types associated with it. Object properties are basically the same as javascript variables except for they’re attached to objects.</P>

        <P>You define a propterty by defining it a value, for example:</P>

        <Code>{`
    var myCar = new Object();
    myCar.make = "Ford";
        `}</Code>

        <P>If you define a property but don’t give it a value it becomes undefined, not null. e.g: <code>myCar.color;</code> would return undefined.</P>

        <P>You can also use bracket notation to iterate over all the properties of an object. e.g:</P>

        <Code>{`
    function showProps(obj, objName) {
      var result = "";
      for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
          result += objName + "." + i + " = " + obj[i];
        }
      }
      return result;
    }
        `}</Code>

        <P>You can also do if else statements with objects:</P>

        <Code>{`
    if (cond) var x = {greeting: 'howdy'};
        `}</Code>

        <P>You can even have an object inside another object:</P>

        <Code>{`
    const myCar = {
      color: "red",
      wheels: 4,
      engine: {
        cylinders: 4,
        size: 2.2
      }
    };
        `}</Code>

        <P>Alternatively you can make an object with a constructor function:</P>

        <Code>{`
    function Car(make, model, year) {
      this.make = make;
      this.model = model;
      this.year = year;
    }

    const myCar = new Car("Volvo", "S40", 2005);
        `}</Code>
      </PostContainer>
    </Document>
  );
};

export default Index;
