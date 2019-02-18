// can be removed once https://github.com/FormidableLabs/prism-react-renderer/commit/ab734bbf7cd582b97154eeeb338c927aa1d4a231 is deployed
declare module 'prism-react-renderer' {
  import * as React from 'react';

  type Language =
    | 'markup'
    | 'bash'
    | 'clike'
    | 'c'
    | 'cpp'
    | 'css'
    | 'javascript'
    | 'jsx'
    | 'coffeescript'
    | 'actionscript'
    | 'css-extr'
    | 'diff'
    | 'docker'
    | 'elixir'
    | 'erlang'
    | 'git'
    | 'go'
    | 'graphql'
    | 'handlebars'
    | 'haskell'
    | 'java'
    | 'json'
    | 'latex'
    | 'less'
    | 'makefile'
    | 'markdown'
    | 'objectivec'
    | 'ocaml'
    | 'php'
    | 'php-extr'
    | 'python'
    | 'reason'
    | 'ruby'
    | 'rust'
    | 'sass'
    | 'scss'
    | 'sql'
    | 'stylus'
    | 'swift'
    | 'typescript'
    | 'vim'
    | 'yaml';

  interface PrismGrammar {
    [key: string]: any;
  }

  type LanguageDict = { [lang in Language]: PrismGrammar };

  interface PrismLib {
    languages: LanguageDict;
    tokenize: (
      code: string,
      grammar: PrismGrammar,
      language: Language
    ) => PrismToken[] | string[];
    highlight: (
      code: string,
      grammar: PrismGrammar,
      language: Language
    ) => string;
  }

  interface PrismThemeEntry {
    color?: string;
    backgroundColor?: string;
    fontStyle?: 'normal' | 'italic';
    fontWeight?:
      | 'normal'
      | 'bold'
      | '100'
      | '200'
      | '300'
      | '400'
      | '500'
      | '600'
      | '700'
      | '800'
      | '900';
    textDecorationLine?:
      | 'none'
      | 'underline'
      | 'line-through'
      | 'underline line-through';
    opacity?: number;
    [styleKey: string]: string | number | void;
  }

  interface PrismTheme {
    plain: PrismThemeEntry;
    styles: {
      types: string[];
      style: PrismThemeEntry;
      languages?: Language[];
    }[];
  }

  interface ThemeDict {
    root: StyleObj;
    plain: StyleObj;
    [type: string]: StyleObj;
  }

  interface Token {
    types: string[];
    content: string;
    empty?: boolean;
  }

  interface PrismToken {
    type: string;
    content: (PrismToken | string)[] | string;
  }

  interface StyleObj {
    [key: string]: string | number | null;
  }

  interface LineInputProps {
    key?: React.Key;
    style?: StyleObj;
    className?: string;
    line: Token[];
    [otherProp: string]: any;
  }

  interface LineOutputProps {
    key?: React.Key;
    style?: StyleObj;
    className: string;
    [otherProps: string]: any;
  }

  interface TokenInputProps {
    key?: React.Key;
    style?: StyleObj;
    className?: string;
    token: Token;
    [otherProp: string]: any;
  }

  interface TokenOutputProps {
    key?: React.Key;
    style?: StyleObj;
    className: string;
    children: string;
    [otherProp: string]: any;
  }

  interface RenderProps {
    tokens: Token[][];
    className: string;
    style: StyleObj;
    getLineProps: (input: LineInputProps) => LineOutputProps;
    getTokenProps: (input: TokenInputProps) => TokenOutputProps;
  }

  interface DefaultProps {
    Prism: PrismLib;
    theme: PrismTheme;
  }

  interface HighlightProps {
    Prism: PrismLib;
    theme?: PrismTheme;
    language: Language;
    code: string;
    children: (props: RenderProps) => React.ReactNode;
  }

  export default class Highlight extends React.Component<HighlightProps> {
    themeDict: ThemeDict;

    getLineProps: (lineInputProps: LineInputProps) => LineOutputProps;

    getStyleForToken: (token: Token) => { [inlineStyle: string]: string };

    getTokenProps: (tokenInputPropsL: TokenInputProps) => TokenOutputProps;
  }

  export const defaultProps: DefaultProps;

  export const Prism: PrismLib;

  export { Language, DefaultProps, PrismTheme };
}

declare module 'prism-react-renderer/themes/*' {
  import { PrismTheme } from 'prism-react-renderer';

  const theme: PrismTheme;
  export default theme;
}
