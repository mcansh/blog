import React from 'react';
import markdown from 'markdown-in-js';
import javascript from 'highlight.js/lib/languages/javascript';
import withOptions from '../components/layouts/withOptions';
import components, { P } from '../components';
import { Code } from '../components/Code';

export default withOptions({
  id: 'javascript-classes',
})(markdown(components)`
  The key concept in class variables and methods is how to define them. Classes are realistically just “special functions”. To define a class, you use the keyword class followed by the name you want to give it.

  ${(
    <Code language="javascript" syntax={javascript}>{`
class myClass {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
    `}</Code>
  )}

  ${(
    <P>
      When you’re defining classes make sure they are hoisted or your code will
      throw errors like
    </P>
  )}

  ${(
    <Code language="javascript" syntax={javascript}>
      {`
var p = new myClass(); // ReferenceError
class myClass {}
      `}
    </Code>
  )}

  ${(
    <P>
      It should be known that the content of a class declaration is executed in
      strict mode.
    </P>
  )}
`);
