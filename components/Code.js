import React from 'react';
import PropTypes from 'prop-types';
import SyntaxHighlighter, {
  registerLanguage,
} from 'react-syntax-highlighter/dist/light';
import { github } from 'react-syntax-highlighter/dist/styles/lowlight';

const Code = ({ language, syntax, children }) => {
  if (!language || !syntax) {
    throw new Error('Please define a `language` and `syntax`.');
  }
  registerLanguage(language, syntax);

  const styles = {
    margin: '3rem 0',
    padding: '1.4rem',
    borderRadius: '4px',
    width: '100%',
    boxSizing: 'border-box',
    wordWrap: 'normal',
    fontSize: '1.6rem',
    lineHeight: '1.5',
    WebkitOverflowScrolling: 'touch',
    background: '#f8f8f8',
    fontFamily:
      'Menlo, Monaco, Lucida Console, Liberation Mono, Courier New, monospace, serif',
  };

  return (
    <SyntaxHighlighter language={language} style={github} customStyle={styles}>
      {children}
    </SyntaxHighlighter>
  );
};

const InlineCode = ({ children }) => (
  <code>
    {children}

    <style jsx>
      {`
        code {
          background: #f3f3f3;
          padding: 2px 4px;
          border-radius: 3px;
          font-size: 0.85em;
          color: #3a3a3a;
          hyphens: none;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            Courier New, monospace, serif;
        }
      `}
    </style>
  </code>
);

Code.propTypes = {
  language: PropTypes.string.isRequired,
  syntax: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

InlineCode.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Code, InlineCode };
