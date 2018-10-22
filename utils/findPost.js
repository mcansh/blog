import posts from '../posts.json';

const findPost = (id: string) => posts.find(post => post.id === id);

const FindPost = ({ id, children }) => {
  const post = findPost(id) || {};
  return children(post);
};

FindPost.defaultProps = {
  id: null,
};

export { findPost };
export default FindPost;
