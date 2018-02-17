import React from 'react';
import markdown from 'markdown-in-js';
import javascript from 'highlight.js/lib/languages/javascript';
import withOptions from '../components/layouts/withOptions';
import components, { P } from '../components';
import { Code } from '../components/Code';

export default withOptions({
  id: 'time-to-hex',
})(markdown(components)`
  It’s actually really easy, [Demo](https://mcansh.github.io/WhatColorIsIt).

  This is a pretty basic one function website, the function runs every second and takes the time in military time and then outputs that as a hex, while changing the background color to it.

  ${(
    <Code language="javascript" syntax={javascript}>{`
function setDate() {
  // get the datetime
  const now = new Date();
  // get hours from our "now" variable
  const hours = now.getHours();
  // get minutes from our "now" variable
  const minutes = now.getMinutes();
  // get seconds from our "now" variable
  const seconds = now.getSeconds();
  // select out h1 element
  const text = document.querySelector('h1');

  // group our 3 variables above to make the time with a hash in front
  const hexTime = "#" + hours + minutes + seconds;

  // make the text of the text variable the content of hexTime variable above
  text.textContent = hexTime;

  // style the body background color to be the hex color
  document.querySelector('body').style.background = hexTime;

  setInterval(setDate, 1000);
}
    `}</Code>
  )}

  ${(
    <P>
      Not so fast, you’re not done yet! Notice when the time is 9:03:03 or any
      time {"that's"} less than 10, the hex is only then 3 numbers, which is
      fine, until you get 4 or 5 digits. So to resolve this you can adjust the
      function like so:
    </P>
  )}

  Now what that’s doing is running a ternary to see if the time is less than 10 or not, if it is, then it prepends a 0 to the variable.

  ${(
    <Code language="javascript" syntax={javascript}>{`
function setDate() {
  // get the datetime
  const now = new Date();
  // get hours from our "now" variable
  const hours = (now.getHours() < 10) ? '0' + now.getHours() : now.getHours();
  // get minutes from our "now" variable
  const minutes = (now.getMinutes() < 10) ? '0' + now.getMinutes() : now.getMinutes();
  // get seconds from our "now" variable
  const seconds = (now.getSeconds() < 10) ? '0' + now.getSeconds() : now.getSeconds();

  // select out h1 element
  const text = document.querySelector('h1');

  // group our 3 variables above to make the time with a hash in front
  const hexTime = "#" + hours + minutes + seconds;

  // make the text of the text variable the content of hexTime variable above
  text.textContent = hexTime;

  // style the body background color to be the hex color
  document.querySelector('body').style.background = hexTime;

  setInterval(setDate, 1000);
}
    `}</Code>
  )}

  ${(
    <P>
      Woohoo! You now have a clock that shows you hexadecimal colors. You can
      even change the android chrome theme color every second:
    </P>
  )}

  ${(
    <Code language="javascript" syntax={javascript}>
      {`document.querySelector('meta[name="theme-color"]').setAttribute('content', hexTime);`}
    </Code>
  )}
`);
