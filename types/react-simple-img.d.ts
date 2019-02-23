/*
 * Type definitions for react-simple-img 2.0
 * Project: https://github.com/bluebill1049/react-simple-img
 * Definitions by: Logan McAnsh <https://github.com/mcansh>
 * Definitions: https://github.com/mcansh/blog
 */

interface Props
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  /*
   * Priority Hints with "low" or "auto": set to "auto" will load image after load event, otherwise "low" will load images after load event and lazy load with intersection observer
   */
  importance?: 'auto' | 'low';
  /*
   * Placeholder image source (svg, jpg, png...) or css color value (white, linear-gradient(blue, pink)), set to false will remove the wrapper and placeholder. (default: low)
   */
  placeholder?: string | boolean;
  /*
   * Image will scale automatically with aspect ratio. Note: width and height will need to be supplied
   */
  applyAspectRatio?: boolean;
  /*
   * animation duration in seconds
   */
  animationDuration?: number;
}

/**
 * React lazy load images with IntersectionObserver API and Priority Hints
 */
declare module 'react-simple-img' {
  function SimpleImg(props: Props): JSX.Element;
}
