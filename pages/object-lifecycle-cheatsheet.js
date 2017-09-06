import React from 'react';
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
    <Document title={title} image={`/static/images/${image}`}>
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

        <P>{"To get an item out of an object you can test to see if it has that property, for example, on a project at work, we used this to get a rule's name out of the object"}</P>

        <Code>{`
    // The Rule itself
    const rule = {
      "active":true,
      "conditions":[{
        "time":{
          "day":[1,2,3,4],
          "at":"17:30"
        }
      }],
      "uuid":"some-rule-uuid",
      "consequences":{
        "devices":{
          "66d5e0ed-5e88-4353-9dd9-318cad3676f9":{
            "thermostat_setpoint.heat.set": {
              "value": 77
            },
            "thermostat_setpoint.cool.set": {
              "value": 80
            }
          }
        }
      },
      "type":"rule",
      "priority":1,
      "name":"test rule"
    };
        `}</Code>

        <Code>{`
    // Return the name from the rule and store it as a variable
    if (Object.prototype.hasOwnProperty.call(rule, 'name')) { // or the easier but "incorrect" way rule.hasOwnProperty('name')
      window.ruleName = rule.name;
    } else {
      throw 'Unknown Rule Name';
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
