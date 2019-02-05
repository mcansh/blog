import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html {
    font-size: 10px;
    box-sizing: border-box;
    text-size-adjust: 100%;
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
    text-decoration: none;
  }

  a::selection {
    color: white;
  }
`;

export default GlobalStyles;
