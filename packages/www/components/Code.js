// @flow
import * as React from 'react';
import styled from 'styled-components';

const CodeFont =
  '"SF Mono", Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif';

const CodeStyles = styled.pre`
  border: 1px solid #464646;
  padding: 2rem 1rem;
  margin: 2.4rem 0 4rem;
  white-space: pre;
  -webkit-overflow-scrolling: touch;
  background: #464646;
  overflow: auto;

  code {
    color: #fff;
    font-family: ${CodeFont};
    font-size: 1.3rem;
    line-height: 2rem;
  }
`;

type CodeProps = {
  language: string,
  children: React.Node,
};

const Code = ({ children, language }: CodeProps) => (
  <CodeStyles className={language ? ` ${language}` : ''}>
    <code>{children}</code>
  </CodeStyles>
);

const InlineCode = styled.code`
  font-size: 1.4rem;
  background: rgba(85, 85, 86, 0.05);
  color: #df0050;
  box-shadow: 0 0 0 0.1rem rgba(85, 85, 86, 0.2);
  border-radius: 0.2rem;
  font-family: ${CodeFont};
  hyphens: none;
  padding: 0 0.4rem;
`;

const Terminal = styled(InlineCode)`
  &::before {
    content: '$ ';
  }
`;

export type { CodeProps };
export { Code, InlineCode, Terminal };
