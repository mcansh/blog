import { createGlobalStyle, keyframes } from 'styled-components';

const Spinner = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

interface Props {
  color: string;
  spinner: boolean;
}

const ProgressContainer = createGlobalStyle<Props>`
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
    animation: ${Spinner} 400ms linear infinite;
  }

  .nprogress-custom-parent {
    overflow: hidden;
    position: relative;
  }

  .nprogress-custom-parent #nprogress .spinner,
  .nprogress-custom-parent #nprogress .bar {
    position: absolute;
  }
`;

export { ProgressContainer };
