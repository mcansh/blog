declare module '*.mdx' {
  import { Post } from '~/components/post-card';
  const MDXComponent: (props) => JSX.Element;
  export const meta: Post;
  export default MDXComponent;
}
