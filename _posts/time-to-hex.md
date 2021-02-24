---
title: How to convert the current time to a hexadecimal
date: '2017-01-09T00:00:00'
image:
  imageUrl: /static/images/posts/team-ui8-199275.jpg
  photographer: Team UI8
  url: 'https://unsplash.com/photos/z8lfwpQVXJo'
editUrl: _posts/time-to-hex.md
lastEdited: '2020-07-08T16:26:33.000Z'
---

It’s actually really easy, [Demo](https://whatcolorisit.loganmcansh.com/).

This is a pretty basic one function website, the function runs every second and
takes the time in military time and then outputs that as a hex, while changing
the background color to it.

```javascript
function setDate() {
  // get the datetime
  const now = new Date();
  // get hours from our "now" variable
  const hours = now.getHours();
  // get minutes from our "now" variable
  const minutes = now.getMinutes();
  // get seconds from our "now" variable
  const seconds = now.getSeconds();
  // select our h1 element
  const text = document.querySelector('h1');

  // group our 3 variables above to make the time with a hash in front
  const hexTime = `#${hours}${minutes}${seconds}`;

  // make the text of the text variable the content of hexTime variable above
  text.textContent = hexTime;

  // style the body background color to be the hex color
  document.body.style.background = hexTime;
}
setInterval(setDate, 1000);
```

Not so fast, you’re not done yet! Notice when the time is `js. 9:03:03` or any
time that's less than 10, the hex is only then 3 numbers. To resolve this you
can pad each variable to add a leading 0, like so:

```javascript
function setDate() {
  // get the datetime
  const now = new Date();

  // get hours from our "now" variable
  const hours = String(now.getHours()).padStart(2, '0');
  // get minutes from our "now" variable
  const minutes = String(now.getMinutes()).padStart(2, '0');
  // get seconds from our "now" variable
  const seconds = String(now.getSeconds()).padStart(2, '0');

  // select our h1 element
  const text = document.querySelector('h1');

  // group our 3 variables above to make the time with a hash in front
  const hexTime = `#${hours}${minutes}${seconds}`;

  // make the text of the text variable the content of hexTime variable above

  text.textContent = hexTime;

  // style the body background color to be the hex color
  document.body.style.background = hexTime;
}
setInterval(setDate, 1000);
```

Woohoo! You now have a clock that shows you hexadecimal colors. You can even
change the android chrome theme color along with it:

```javascript
document.querySelector('meta[name="theme-color"]').content = hexTime;
```
