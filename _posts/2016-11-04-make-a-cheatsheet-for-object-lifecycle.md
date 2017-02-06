---
layout: post
title:  "Make a cheatsheet for Object Lifecycle. Talk about key concepts, functions, and best practices."
date:   "2016-11-04"
header-img: ttn_obfwlgw-wesley-caribe-squashed.jpg
excerpt:
---

Firstly, I'd like to apolagize for the lack and timing of these posts. I've been busy at work and unfortunately haven't had the time to write them <emoji>😭</emoji>.

A Javascript object is a standalone entity, with properties and types associated with it. <strong>Object properties are basically the same as javascript variables</strong> except for they're attached to objects.

You define a propterty by defining it a value, for example:
{% highlight js %}
  var myCar = new Object();
  myCar.make = "Ford";
{% endhighlight %}

If you define a property but don't give it a value it becomes undefined, not null. e.g:
<code>myCar.color;</code> would return undefined.

You can also use bracket notation to iterate over all the properties of an object. e.g:

{% highlight js %}
  function showProps(obj, objName) {
    var result = "";
    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        result += objName + "." + i + " = " + obj[i] + "\n";
      }
    }
    return result;
  }
{% endhighlight %}


You can also do if else statements with objects:
{% highlight js %}
  if (cond) var x = {greeting: 'howdy'};
{% endhighlight %}

You can even have an object inside another object
{% highlight js %}
  var myHonday = {
    color: "red",
    wheels: 4,
    engine: {
      cylinders: 4,
      size: 2.2
    }
  };
{% endhighlight %}

Alternatively you can make an object with a constructor function
{% highlight js %}
  function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }
{% endhighlight %}

{% highlight js %}
  var myCar = new Car("Volvo", "S40", 2005);
{% endhighlight %}
