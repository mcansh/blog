import preval from 'babel-plugin-preval/macro';

import { Post } from '~/components/post-card';

const posts: Post[] = preval`
  module.exports = require('./get-posts.js');
`;

export default posts;
