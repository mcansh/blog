import React from 'react';
import styled from 'styled-components';
import Highlight, { defaultProps } from 'prism-react-renderer';
import OceanicNext from 'prism-react-renderer/themes/oceanicNext';

const CodeStyles = styled.pre`
  margin: 3rem 0;
  padding: 1.4rem;
  border-radius: 0.4rem;
  width: 100%;
  word-wrap: normal;
  font-size: 1.6rem;
  line-height: 1.5;
  webkit-overflow-scrolling: touch;
  font-family: 'SF Mono', menlo, monospace;
  ${props => props.additionalStyles};
`;

export const Code = ({ language, children }) => (
  <Highlight
    {...defaultProps}
    code={children}
    language={language}
    theme={OceanicNext}
  >
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <CodeStyles className={className} additionalStyles={style}>
        {tokens.map((line, i) => (
          <div {...getLineProps({ line, key: i })}>
            {line.map((token, key) => (
              <span {...getTokenProps({ token, key })} />
            ))}
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
  font-family: 'SF Mono', menlo, monospace;
  hyphens: none;
`;
