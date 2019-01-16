// import original module declaration
import 'styled-components';

// and extend it
declare module 'styled-components' {
  interface DefaultTheme {
    [key: string]: string;
  }
}
