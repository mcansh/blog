import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html {
    font-size: 10px;
    box-sizing: border-box;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
    margin: 0;
  }


  body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-weight: 400;
    margin: 0;
    background: ${props => props.theme.background};
  }

  ::selection {
    background: ${props => props.theme.primary};
    color: white;
  }

  a {
    color: ${props => props.theme.primary};
    text-decoration-skip: ink;
    transition: 300ms all ease-in-out;
  }

  a:hover {
    color: ${props => props.theme.secondary};
  }

  a::selection {
    color: white;
  }

  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background: ${props => props.theme.primary};
    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;
    width: 100%;
    height: 0.2rem;
  }

  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0;
    width: 10rem;
    height: 100%;
    box-shadow: 0 0 1rem ${props => props.theme.primary}, 0 0 0.5rem ${props =>
  props.primary};
    opacity: 1;
    transform: rotate(3deg) translate(0, -0.4rem);
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

export default GlobalStyles;
