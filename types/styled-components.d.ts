import { CSSProp } from 'styled-components';

import theme from '../config';

type ThemeInterface = typeof theme;

declare module 'styled-components' {
  interface DefaultTheme extends ThemeInterface {
    primary: string;
    background: string;
  }
}

declare module 'react' {
  interface Attributes {
    css?: CSSProp;
  }
}
