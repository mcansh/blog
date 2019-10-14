import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    color-scheme: light dark;
    --primary: ${props => props.theme.primary};
    --background: ${props => props.theme.light.background};
    --text: ${props => props.theme.light.text};
    @media (prefers-color-scheme: dark) {
      --background: ${props => props.theme.dark.background};
      --text: ${props => props.theme.dark.text};
    }
  }

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
    font-family: 'SF Pro',-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif;
    font-weight: 400;
    margin: 0;
    background: var(--background);
  }

  ::selection {
    background: var(--primary);
    color: white;
  }

  a {
    color: var(--primary);
    transition: 300ms all ease-in-out;
    &:hover {
      text-decoration: none;
    }
    &::selection {
      color: white;
    }
  }

`;

export default GlobalStyles;
