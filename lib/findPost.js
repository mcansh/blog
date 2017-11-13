import posts from '../posts.json';

const findPost = id => posts.find(post => post.id === id);

export default findPost;
