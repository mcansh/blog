---
title: Ruby project
date: '2017-12-09T00:00:00'
image:
  imageUrl: /static/images/posts/stacy-wyss-702.jpg
  photographer: Stacy Wyss
  url: 'https://unsplash.com/photos/-aDl1z8_nGY'
editUrl: _posts/ruby-project.md
lastEdited: '2020-07-08T16:26:33.000Z'
---

Ruby. There's times I absolutely hate it, and there's times I'm cool with it.
This was actualy one of the times I enjoyed it. For my
[Ruby CLI project](https://github.com/mcansh/ruby-reddit-cli-app) I decided to
scrape [r/ruby](https://reddit.com/r/ruby), and reddit made it super easy to get
all the info. Maybe in an upcoming update I'll add the ability to pass in a
subreddit as a parameter so it'll be more versatile, but for now its just
r/ruby. The scraping itself is done with Nokogiri inside the
[scraper class](https://github.com/mcansh/ruby-reddit-cli-app/blob/master/lib/reddit/scraper.rb).

Check it out on [github](https://github.com/mcansh/ruby-reddit-cli-app) or on
[rubygems](https://rubygems.org/gems/reddit-ruby)

**Update:** as of
[1.0.8](https://github.com/mcansh/ruby-reddit-cli-app/releases/tag/1.0.8), it
supports any public subreddit.
