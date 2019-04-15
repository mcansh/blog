import React from 'react';
import styled from 'styled-components';
import Highlight, { defaultProps } from 'prism-react-renderer';
import nightOwl from 'prism-react-renderer/themes/nightOwl';

interface CoodeStyleProps {
  style: React.CSSProperties;
}

const CodeStyles = styled.code<CoodeStyleProps>`
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
  display: block;
`;

interface CodeProps {
  className: string;
  children: string;
}

const Code = ({ children, className }: CodeProps) => {
  const language = className.replace(/language-/, '');
  return (
    <Highlight
      {...defaultProps}
      code={children}
      language={language}
      theme={nightOwl}
    >
      {highlight => (
        <CodeStyles className={className} style={{ ...highlight.style }}>
          {highlight.tokens.map((line, index) => (
            <div {...highlight.getLineProps({ line, key: index })}>
              {line.map((token, key) => (
                <span {...highlight.getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </CodeStyles>
      )}
    </Highlight>
  );
};

const InlineCode = styled.code`
  font-size: 0.85em;
  padding: 0.125rem 0.25rem;
  background: rgba(85, 85, 86, 0.05);
  color: #df0050;
  box-shadow: 0 0 0 0.1rem rgba(85, 85, 86, 0.2);
  border-radius: 0.2rem;
  font-family: 'Operator Mono', 'SF Mono', menlo, monospace;
  hyphens: none;
`;

export { Code, InlineCode };
