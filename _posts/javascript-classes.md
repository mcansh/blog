---
title: JavaScript classes key concepts
date: '2016-11-20T00:00:00'
image:
  imageUrl: /static/images/posts/mia-baker-322594.jpg
  photographer: Mia Baker
  url: 'https://unsplash.com/photos/klRB1BB9pV8'
editUrl: _posts/javascript-classes.md
lastEdited: '2020-07-08T16:26:33.000Z'
---

The key concept in class variables and methods is how to define them. Classes
are realistically just “special functions”. To define a class, you use the
keyword class followed by the name you want to give it.

```javascript
class myClass {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
```

When you’re defining classes make sure they are hoisted or your code will throw
errors like

```javascript
var p = new myClass(); // ReferenceError
class myClass {}
```

It should be known that the content of a class declaration is executed in strict
mode.
