/* eslint-disable no-duplicate-imports, import/no-duplicates */
// Strongly type the styled-components theme
import {} from 'styled-components';
import { CSSProp } from 'styled-components';

import theme from '../config';

type ThemeInterface = typeof theme;

declare module 'styled-components' {
  type DefaultTheme = ThemeInterface;
}

// Enable css prop support globally
declare module 'react' {
  interface Attributes {
    css?: CSSProp;
  }
}
