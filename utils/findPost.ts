import posts from '~/posts.json';

const findPost = (id?: string | null) => posts.find(post => post.id === id);

interface Props {
  id?: string | null;
  children: Function;
}

const FindPost = ({ id, children }: Props) => {
  const post = findPost(id) || {};
  return children(post);
};

FindPost.defaultProps = {
  id: null,
};

export { findPost };
export default FindPost;
