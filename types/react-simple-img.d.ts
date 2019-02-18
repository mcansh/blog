// Type definitions for react-simple-img 1.13.0
// Project: https://github.com/bluebill1049/react-simple-img
// Definitions by: Logan McAnsh <https://github.com/mcansh>
// Definitions: https://github.com/mcansh/blog

interface Props
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  importance?: 'high' | 'low';
  placeholder?: string;
  applyAspectRatio?: boolean;
  animationDuration?: number;
  animationEndStyle?: React.CSSProperties;
}

/**
 * React lazy load images with IntersectionObserver API and Priority Hints
 */
declare module 'react-simple-img' {
  function SimpleImg(props: Props): JSX.Element;
  function SimpleImgProvider(props: any): any;
}
