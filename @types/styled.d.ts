// Strongly type the styled-components theme
import type { CSSProp } from 'styled-components';

import type theme from '../config';

// Enable css prop support globally
declare module 'react' {
  interface Attributes {
    css?: CSSProp;
  }
}

declare module 'styled-components' {
  type Theme = typeof theme;
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}
