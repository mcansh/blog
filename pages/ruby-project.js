import markdown from 'markdown-in-js';
import withOptions from '../components/layouts/withOptions';
import components from '../components';

export default withOptions({
  id: 'ruby-project',
})(markdown(components)`
  Ruby. There's time I absolutely hate it, and there's times I'm cool with it. This was actualy one of the times I enjoyed it. For my [Ruby CLI project](https://github.com/mcansh/ruby-reddit-cli-app) I decided to scrape [r/ruby](https://reddit.com/r/ruby), and reddit made it super easy to get all the info. Maybe in an upcoming update I'll add the ability to pass in a subreddit as a parameter so it'll be more versatile, but for now its just r/ruby. The scraping itself is done with Nokogiri inside the [scraper class](https://github.com/mcansh/ruby-reddit-cli-app/blob/master/lib/reddit/scraper.rb).

  Check it out on [github](https://github.com/mcansh/ruby-reddit-cli-app) or on [rubygems](https://rubygems.org/gems/reddit-ruby)
`);
