declare module 'mdx-utils' {
  interface PreProps {
    children: {
      props: {
        mdxType?: 'code' | string;
        children: string;
        className: string;
      };
    };
  }

  export const preToCodeBlock = (_preProps: PreProps) => ({
    codeString: string,
    className: string,
    language: string,
  });
}
