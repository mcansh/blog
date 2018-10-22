// @flow
import posts from '../posts.json';

// $FlowIssue
const findPost = (id: string) => posts.find(post => post.id === id);

type Props = {
  id?: string | null,
  // $FlowIssue
  children: any,
};

const FindPost = ({ id, children }: Props) => {
  const post = findPost(id) || {};
  return children(post);
};

FindPost.defaultProps = {
  id: null,
};

export { findPost };
export default FindPost;
