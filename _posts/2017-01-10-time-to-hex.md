---
layout: post
title:  "How To Convert The Current Time To A Hexadecimal"
date:   "2017-01-10"
header-img: photo-1472856053553-799da7ffa653-squashed.jpeg
excerpt:
---

It's actually really easy. [Demo](https://mcansh.github.io/WhatColorIsIt/)

This is a pretty basic one function website, the function runs every second and takes the time in military time and then outputs that as a hex, while changing the background color to it.

{% highlight js %}
function setDate() {
  // get the datetime
  const now = new Date();
  // get hours from our now variable
  const hours = now.getHours();
  // get minutes from our now variable
  const minutes = now.getMinutes();
  // get seconds from our now variable
  const seconds = now.getSeconds();

  // select out h1 element
  const text = document.querySelector('h1');

  // group our 3 variables above to make the time with a hash in front
  const hexTime = `#${hours}${minutes}${seconds}`;

  // make the text of the text variable the content of hexTime variable above
  text.textContent = hexTime;

  // style the body background color to be the hex color
  document.querySelector('body').style.background = hexTime;

  setInterval(setDate, 1000);
}
{% endhighlight %}

Not so fast, you're not done yet! Notice when the time is 9:03:03 or any time thats less than 10, the hex is only then 3 numbers, which is fine, until you get 4 or 5 digits. So to resolve this you can adjust the function like so:

{% highlight js %}
function setDate() {
  // get the datetime
  const now = new Date();
  // get hours from our now variable
  const tempHours = now.getHours();
  const hours = (tempHours < 10) ? `0${tempHours}` : tempHours;
  // get minutes from our now variable
  const tempMinutes = now.getMinutes();
  const minutes = (tempMinutes < 10) ? `0${tempMinutes}` : tempMinutes;
  // get seconds from our now variable
  const tempSeconds = now.getSeconds();
  const seconds = (tempSeconds < 10) ? `0${tempSeconds}` : tempSeconds;

  // select out h1 element
  const text = document.querySelector('h1');

  // group our 3 variables above to make the time with a hash in front
  const hexTime = `#${hours}${minutes}${seconds}`;

  // make the text of the text variable the content of hexTime variable above
  text.textContent = hexTime;

  // style the body background color to be the hex color
  document.querySelector('body').style.background = hexTime;

  setInterval(setDate, 1000);
{% endhighlight %}

Now what that's doing is running a tenerary to see if the time is less than 10 or not, if it is, then it prepends a 0 to the variable. You probably also noticed that we're never calling `setDate()`.

Woohoo! You now have a clock that shows you hexadecimal colors. You can even change the android chrome theme color every second.

{% highlight js %}
document.querySelector('meta[name="theme-color"]').setAttribute('content', hexTime);
{% endhighlight %}
