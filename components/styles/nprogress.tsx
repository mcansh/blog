import React, { useEffect, useRef } from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';
import { createGlobalStyle } from 'styled-components';

interface Props {
  showAfterMs?: number;
  options?: {
    parent?: string;

    /*
     * The minimum progress percentage. Default is 0.08.
     */
    minimum?: number;

    /*
     * How often to trickle, in milliseconds. Default is 800.
     */
    trickleSpeed?: number;

    /*
     * Whether to show the spinner. Defaults to true. Default is true.
     */
    showSpinner?: boolean;

    /*
     * Whether to enable trickling the progress. Default is true.
     */
    trickle?: boolean;

    /*
     * The CSS easing animation to use. Default is 'linear'.
     */
    easing?: string;

    /*
     * The animation speed in milliseconds. Default is 200.
     */
    speed?: number;

    /*
     * The HTML markup inserted for the progress indicator. To keep the progress bar working, keep an element with role='bar' in there.
     */
    template?: string;
  };
  color?: string;
  spinner?: boolean;
}

const Progress = createGlobalStyle<Props>`
  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background: ${props => props.color};
    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
  }

  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px ${props => props.color}, 0 0 5px ${props =>
  props.color};
    opacity: 1;
    transform: rotate(3deg) translate(0px, -4px);
  }

  #nprogress .spinner {
    display: ${props => (props.spinner ? 'block' : 'none')};
    position: fixed;
    z-index: 1031;
    top: 15px;
    right: 15px;
  }

  #nprogress .spinner-icon {
    width: 18px;
    height: 18px;
    box-sizing: border-box;
    border: solid 2px transparent;
    border-top-color: ${props => props.color};
    border-left-color: ${props => props.color};
    border-radius: 50%;
    animation: nprogress-spinner 400ms linear infinite;
  }

  .nprogress-custom-parent {
    overflow: hidden;
    position: relative;
  }

  .nprogress-custom-parent #nprogress .spinner,
  .nprogress-custom-parent #nprogress .bar {
    position: absolute;
  }

  @keyframes nprogress-spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const NProgressContainer = ({
  showAfterMs,
  options,
  color,
  spinner,
}: Props) => {
  const timer = useRef(null);

  const routeChangeStart = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(NProgress.start, showAfterMs);
  };

  const routeChangeEnd = () => {
    clearTimeout(timer.current);
    NProgress.done();
  };

  useEffect(() => {
    if (options) {
      NProgress.configure(options);
    }

    Router.events.on('routeChangeStart', routeChangeStart);
    Router.events.on('routeChangeComplete', routeChangeEnd);
    Router.events.on('routeChangeError', routeChangeEnd);

    return () => {
      clearTimeout(timer.current);
      Router.events.off('routeChangeStart', routeChangeStart);
      Router.events.off('routeChangeComplete', routeChangeEnd);
      Router.events.off('routeChangeError', routeChangeEnd);
    };
  }, [options, routeChangeEnd, routeChangeStart]);

  return <Progress color={color} spinner={spinner} />;
};

NProgressContainer.defaultProps = {
  color: '#2299DD',
  showAfterMs: 300,
  spinner: true,
};

export default NProgressContainer;
