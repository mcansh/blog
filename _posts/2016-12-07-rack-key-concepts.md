---
layout: post
title:  "What are some of the key concepts in Rack and the Internet?"
date:   "2016-12-07"
header-img: photo-1472856053553-799da7ffa653-squashed.jpeg
excerpt:
---

The most important thing to know about Rack and the internet is knowing how the internet works. First you have `HEAD, GET, POST, PUT, DELETE, TRACE, OPTIONS, CONNECT,` and `PATCH` requests. 🤔 huh? Let's run through them.

`GET` requests get a resource.
`HEAD` requests are `GET` requests without the body of them.
`POST` requests will submit data.
`PUT` will upload data.
`DELETE` will, well, delete a resource.
`TRACE` requests will return the recieved request.
`OPTIONS` will return the HTTP methods that your server supports.
`CONNECT` converts the request to a TCP/IP tunnel, ususally used for SSL.
`PATCH` requests are used for partial modifications to a resource.

You can see what type of requests a website is using by looking in the network tab in Dev Tools.

Now onto Rack itself. Rack is a Ruby gem that provides a minimal interface that goes between a server that supports Ruby and Ruby Frameworks.

To use Rack you must first make a call to a class `#call`. All this needs to do is return a response that contains status codes, headers, and the body. That can be done with a `Rack::Response` object:
{% highlight ruby %}
  class Application

    def call(env)
      resp = Rack::Response.new
      resp.write "Hello, World"
      resp.finish
    end

  end
{% endhighlight %}

That will run whenever a request is received but you still need to set up a HTTP serve to receive that request. Using config.ru
{% highlight ruby %}
  #config.ru
  require_relative "./application.rb"

  run Application.new
{% endhighlight %}

Now running `rackup config.ru` will start up your application.
