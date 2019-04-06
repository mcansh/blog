import * as React from 'react';
import styled from 'styled-components';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import nightOwl from 'prism-react-renderer/themes/nightOwl';

interface CoodeStyleProps {
  style: React.CSSProperties;
}

const CodeStyles = styled.pre<CoodeStyleProps>`
  margin: 3rem 0;
  padding: 1.4rem;
  border-radius: 0.4rem;
  width: 100%;
  word-wrap: normal;
  font-size: 1.6rem;
  line-height: 1.5;
  -webkit-overflow-scrolling: touch;
  font-family: 'Operator Mono', 'SF Mono', menlo, monospace;
  overflow: scroll;
`;

interface CodeProps {
  language: Language;
  children: string;
}

export const Code = ({ language, children }: CodeProps) => (
  <Highlight
    {...defaultProps}
    code={children}
    language={language}
    theme={nightOwl}
  >
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <CodeStyles className={className} style={style}>
        {tokens.map((line, i) => (
          <div {...getLineProps({ line, key: i })}>
            {line.map(
              (token: { content: string; types: string[] }, key: number) => (
                <span {...getTokenProps({ token, key })} />
              )
            )}
          </div>
        ))}
      </CodeStyles>
    )}
  </Highlight>
);

export const InlineCode = styled.code`
  font-size: 0.85em;
  padding: 0.125rem 0.25rem;
  background: rgba(85, 85, 86, 0.05);
  color: #df0050;
  box-shadow: 0 0 0 0.1rem rgba(85, 85, 86, 0.2);
  border-radius: 0.2rem;
  font-family: 'Operator Mono', 'SF Mono', menlo, monospace;
  hyphens: none;
  @media (prefers-color-scheme: dark) {
    padding: 0.25rem 0.5rem;
    background: #313639;
    color: #dd6a40;
    box-shadow: 0 0.1rem 0 0 #24292c;
  }
`;
