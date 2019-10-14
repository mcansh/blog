declare module '*.mdx' {
  import { Post } from '~/components/post-card';
  const MDXComponent: (props) => JSX.Element;
  const meta: Post;
  export { meta };
  export default MDXComponent;
}
