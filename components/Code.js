import React from 'react';
import PropTypes from 'prop-types';
import SyntaxHighlighter, {
  registerLanguage,
} from 'react-syntax-highlighter/light';
import { github } from 'react-syntax-highlighter/styles/hljs';

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
    fontFamily: 'native, menlo, monospace',
  };

  return (
    <SyntaxHighlighter language={language} style={github} customStyle={styles}>
      {children.trim()}
    </SyntaxHighlighter>
  );
};

const InlineCode = ({ children }) => (
  <code>
    {children}
    <style jsx>{`
      code {
        font-size: 0.85em;
        padding: 0.125rem 0.25rem;
        background: rgba(85, 85, 86, 0.05);
        color: #df0050;
        box-shadow: 0 0 0 1px rgba(85, 85, 86, 0.2);
        border-radius: 2px;
        font-family: native, menlo, monospace;
        hyphens: none;
      }
    `}</style>
  </code>
);

Code.propTypes = {
  language: PropTypes.string.isRequired,
  syntax: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

InlineCode.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Code, InlineCode };
