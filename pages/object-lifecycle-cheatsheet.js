import React from 'react';
import markdown from 'markdown-in-js';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import withOptions from '../components/layouts/withOptions';
import components, { P } from '../components';
import { Code } from '../components/Code';

export default withOptions({
  id: 'object-lifecycle-cheatsheet',
})(markdown(components)`
Firstly, I’d like to apolagize for the lack and timing of these posts. I’ve been busy at work and unfortunately haven’t had the time to write them 😭.

A Javascript object is a standalone entity, with properties and types associated with it. Object properties are basically the same as javascript variables except for they’re attached to objects.

You define a propterty by defining it a value, for example:

  ${(
    <Code language="javascript" syntax={javascript}>{`
const myCar = new Object();
myCar.make = "Ford";
    `}</Code>
  )}

  ${(
    <P>
      If you define a property but {"don't"} give it a value it becomes
      undefined, not null. e.g: myCar.color; would return undefined.
    </P>
  )}

  ${(
    <P>
      To get an item out of an object you can test to see if it has that
      property, for example, on a project at work, we used this to get a{' '}
      {"rule's"}
      name out of the object
    </P>
  )}

  ${(
    <Code language="javascript" syntax={json}>{`
// The Rule itself
const rule = {
  "active": true,
  "conditions": [
    {
      "time": {
        "day": [1,2,3,4],
        "at": "17:30"
      }
    }
  ],
  "uuid": "some-rule-uuid",
  "consequences": {
    "devices": {
      "66d5e0ed-5e88-4353-9dd9-318cad3676f9": {
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
  )}

  ${<P>You can also do if else statements with objects:</P>}

  ${(
    <Code language="javascript" syntax={javascript}>{`
if (cond) var x = {greeting: 'howdy'};
    `}</Code>
  )}

  ${<P>You can even have an object inside another object:</P>}

  ${(
    <Code language="javascript" syntax={javascript}>{`
const myCar = {
  color: "red",
  wheels: 4,
  engine: {
    cylinders: 4,
    size: 2.2
  }
};
    `}</Code>
  )}

  ${<P>Alternatively you can make an object with a constructor function:</P>}

  ${(
    <Code language="javascript" syntax={javascript}>{`
function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}

const myCar = new Car("Volvo", "S40", 2005);
    `}</Code>
  )}

`);
