import React from 'react';
import PropTypes from 'prop-types';
import Highlight, { defaultProps } from 'prism-react-renderer';
import OceanicNext from 'prism-react-renderer/themes/oceanicNext';

export const Code = ({ language, children }) => (
  <Highlight
    {...defaultProps}
    code={children}
    language={language}
    theme={OceanicNext}
  >
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre
        className={className}
        style={{
          ...style,
          margin: '3rem 0',
          padding: '1.4rem',
          borderRadius: '0.4rem',
          width: '100%',
          boxSizing: 'border-box',
          wordWrap: 'normal',
          fontSize: '1.6rem',
          lineHeight: '1.5',
          WebkitOverflowScrolling: 'touch',
          fontFamily: 'native, menlo, monospace',
        }}
      >
        {tokens.map((line, i) => (
          <div {...getLineProps({ line, key: i })}>
            {line.map((token, key) => (
              <span {...getTokenProps({ token, key })} />
            ))}
          </div>
        ))}
      </pre>
    )}
  </Highlight>
);

// const Code = ({ language, syntax, children }) => {
//   if (!language || !syntax) {
//     throw new Error('Please define a `language` and `syntax`.');
//   }

//   registerLanguage(language, syntax);

//   const styles = {
//     margin: '3rem 0',
//     padding: '1.4rem',
//     borderRadius: '0.4rem',
//     width: '100%',
//     boxSizing: 'border-box',
//     wordWrap: 'normal',
//     fontSize: '1.6rem',
//     lineHeight: '1.5',
//     WebkitOverflowScrolling: 'touch',
//     background: 'white',
//     fontFamily: 'native, menlo, monospace',
//   };

//   return (
//     <SyntaxHighlighter language={language} style={github} customStyle={styles}>
//       {children.trim()}
//     </SyntaxHighlighter>
//   );
// };

export const InlineCode = ({ children }) => (
  <code>
    {children}
    <style jsx>{`
      code {
        font-size: 0.85em;
        padding: 0.125rem 0.25rem;
        background: rgba(85, 85, 86, 0.05);
        color: #df0050;
        box-shadow: 0 0 0 0.1rem rgba(85, 85, 86, 0.2);
        border-radius: 0.2rem;
        font-family: native, menlo, monospace;
        hyphens: none;
      }
    `}</style>
  </code>
);

// Code.propTypes = {
//   language: PropTypes.string.isRequired,
//   syntax: PropTypes.func.isRequired,
//   children: PropTypes.node.isRequired,
// };

InlineCode.propTypes = {
  children: PropTypes.node.isRequired,
};
