interface Meta {
  url: string;
  title: string;
  date: number;
  image: {
    imageUrl: string;
    photographer: string;
    url: string;
  };
}

declare module '*.mdx' {
  const MDXComponent: (props) => JSX.Element;
  const meta: Meta;
  export { meta };
  export default MDXComponent;
}
