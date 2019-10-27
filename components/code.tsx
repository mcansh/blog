import React from 'react';
import styled from 'styled-components';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';

const RE = /{([\d,-]+)}/;

const calculateLinesToHighlight = (meta?: string | number) => {
  if (!meta) return false;
  if (!RE.test(String(meta))) return () => false;
  const possibleLineNumbers = RE.exec(String(meta));
  if (!possibleLineNumbers) return false;
  const lineNumbers = possibleLineNumbers[1]
    .split(',')
    .map(v => v.split('-').map(d => parseInt(d, 10)));
  return (index: number) => {
    const lineNumber = index + 1;
    const inRange = lineNumbers.some(([start, end]) =>
      end ? lineNumber >= start && lineNumber <= end : lineNumber === start
    );
    return inRange;
  };
};

const CodeStyles = styled.pre`
  margin-bottom: 1.8rem;
  padding: 1rem;
  border-radius: 0.4rem;
  font-size: 1.6rem;
  overflow-x: auto;
  line-height: 1.5;
  float: left;
  width: 100%;

  ::-webkit-scrollbar {
    width: 100%;
    height: 0.5rem;
    border-radius: 0 0 0.5rem 0.5rem;
  }
  ::-webkit-scrollbar-track {
    background: #061526;
    border-radius: 0 0 0.4rem 0.4rem;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 0.5rem;
  }

  .token-line-number {
    display: inline-block;
    user-select: none;
    opacity: 0.3;
    width: 2em;
  }

  .highlight-line {
    background-color: rgba(201, 167, 255, 0.2);
    margin: 0 -1rem;
    padding: 0 0.5rem;
    border-left: 5px solid #c9a7ff;
  }
`;

interface CodeProps {
  codeString: string;
  language: Language;
  metastring?: string;
}

const Code: React.FC<CodeProps> = ({ codeString, language, metastring }) => {
  const shouldHighlightLine = metastring
    ? calculateLinesToHighlight(metastring)
    : false;

  return (
    <Highlight
      {...defaultProps}
      code={codeString}
      language={language}
      theme={theme}
    >
      {({ tokens, getLineProps, getTokenProps, className, style }) => (
        <div css={{ overflow: 'auto', '-webkit-overflow-scrolling': 'touch' }}>
          <CodeStyles className={className} style={style}>
            {tokens.map((line, index) => {
              const lineProps = getLineProps({ line, key: index });
              if (
                typeof shouldHighlightLine === 'function' &&
                shouldHighlightLine(index)
              ) {
                lineProps.className = `${lineProps.className} highlight-line`;
              }

              return (
                <div key={index} {...lineProps}>
                  <span className="token-line-number">{index + 1}</span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              );
            })}
          </CodeStyles>
        </div>
      )}
    </Highlight>
  );
};

// lifted this from mdx-utils
// it doesn't compile it's code and this busted IE, so I'm just vendoring it.
function preToCodeBlock(preProps: any) {
  if (
    // children is code element
    preProps.children &&
    // code props
    preProps.children.props &&
    // if children is actually a <code>
    preProps.children.props.mdxType === 'code'
  ) {
    // we have a <pre><code> situation
    const {
      children: codeString,
      className = '',
      ...props
    } = preProps.children.props;

    const matches = className.match(/language-(?<lang>.*)/);

    return {
      codeString: codeString.trim(),
      className,
      language: matches?.groups?.lang ?? '',
      ...props,
    };
  }
  return null;
}

const Pre: React.FC = (preProps: any) => {
  const props = preToCodeBlock(preProps);
  // if there's a codeString and some props, we passed the test
  if (props) {
    return <Code {...props} />;
  }
  // it's possible to have a pre without a code in it
  return <pre {...preProps} />;
};

const InlineCode = styled.code`
  font-size: 0.85em;
  padding: 0.125rem 0.25rem;
  background: rgba(85, 85, 86, 0.05);
  color: #df0050;
  box-shadow: 0 0 0 0.1rem rgba(85, 85, 86, 0.2);
  border-radius: 0.2rem;
  font-family: 'Dank Mono', 'Operator Mono', 'SF Mono', menlo, monospace;
  hyphens: none;
`;

export { Code, InlineCode, Pre };
