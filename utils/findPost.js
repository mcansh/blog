// @flow
import posts from '../posts.json';
import type { PostTypes } from '../components/PostCard';

// $FlowIssue
const findPost = (id: string): PostTypes => posts.find(post => post.id === id);

export default findPost;
