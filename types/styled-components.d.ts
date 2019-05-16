import 'styled-components';
// eslint-disable-next-line import/no-unresolved
import {} from 'styled-components/cssprop';
import theme from '../config';

type ThemeInterface = typeof theme;

declare module 'styled-components' {
  interface DefaultTheme extends ThemeInterface {
    primary: string;
    background: string;
  }
}
