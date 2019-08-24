declare module '*.mdx' {
  import { Post } from '~/components/post-card';
  const MDXComponent: (props) => JSX.Element, meta: Post;
  export { meta };
  export default MDXComponent;
}
