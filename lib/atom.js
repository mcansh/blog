const { posts } = require('../posts');

module.exports = () => `<?xml version="1.0" encoding="utf-8"?>
  <feed xmlns="http://www.w3.org/2005/Atom">
    <title>Logan McAnsh</title>
    <subtitle>Blog</subtitle>
    <link href="https://blog.loganmcansh.com/atom" rel="self"/>
    <link href="https://blog.loganmcansh.com/"/>
    <updated>${posts[0].date}</updated>
    <id>https://blog.loganmcansh.com/</id>
    <author>
      <name>Logan McAnsh</name>
      <email>logan@mcan.sh</email>
    </author>
    ${posts.map(({ date, title, link }) => (`
      <entry>
        <id>${link}</id>
        <title>${title}</title>
        <link href="https://blog.loganmcansh.com/${link}"/>
        <updated>${date}</updated>
      </entry>
    `)).join('')}
  </feed>
`;
