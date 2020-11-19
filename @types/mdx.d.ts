declare module '*.mdx' {
  import type { Post } from '~/components/post-card';
  const MDXComponent: (props) => JSX.Element;
  export const frontMatter: Post;
  export default MDXComponent;
}
