---
layout: post
title:  "What are some of the key concepts in Class Variables and Methods?"
date:   "2016-11-21"
header-img: kgsapvfg8kw-kalen-emsley.jpg
excerpt:
---

The key concept in class variables and methods is how to define them. Classes are realistically just "special functions". To define a class, you use the keyword `class` followed by the name you want to give it.

{% highlight js %}
  class myClass {
    constructor(height, width) {
      this.height = height;
      this.width = width;
    }
  }
{% endhighlight %}

When you're defining classes make sure they are hoisted or your code will throw errors like

{% highlight js %}
  var p = new myClass(); // ReferenceError

  class myClass {}
{% endhighlight %}

It should be known that the content of a class declaration is executed in strict mode.
