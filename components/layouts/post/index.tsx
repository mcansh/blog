import React from 'react';

import Paragraph from '~/components/paragraph';
import useScrollProgress from '~/components/use-scroll-progress';
import { Pre, InlineCode } from '~/components/code';
import Link from '~/components/link';
import { Post } from '~/lib/get-post';

// const ScrollProgress = styled.progress.attrs({ max: 100, min: 0 })`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   z-index: 2;
//   height: 3px;
//   appearance: none;
//   border: none;
//   background: none;

//   &::-webkit-progress-bar {
//     background-color: transparent;
//   }

//   &::-webkit-progress-value {
//     background-image: linear-gradient(135deg, #7fdbca 0%, #82aaff 100%);
//   }

//   &::-moz-progress-bar {
//     background-image: linear-gradient(135deg, #7fdbca 0%, #82aaff 100%);
//   }
// `;

const components = {
  inlineCode: InlineCode,
  p: Paragraph,
  a: Link,
  pre: Pre,
};

interface MDXPostProps {
  frontMatter: Post;
}

const MDXPost: React.FC<MDXPostProps> = ({ children }) => {
  const { formatted, percent } = useScrollProgress();

  return (
    <>
      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        className="w-full h-1"
      >
        <div style={{ width: formatted }} />
      </div>

      <div className="mx-auto mt-7 max-w-prose">{children}</div>
    </>
  );
};

export { MDXPost, components };
