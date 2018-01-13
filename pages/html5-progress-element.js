import React from 'react';
import markdown from 'markdown-in-js';
import javascript from 'react-syntax-highlighter/languages/hljs/javascript';
import css from 'react-syntax-highlighter/languages/hljs/css';
import htmlbars from 'react-syntax-highlighter/languages/hljs/htmlbars';
import colors from '../theme';
import withOptions from '../components/layouts/withOptions';
import components from '../components';
import { InlineCode, Code } from '../components/Code';

export default withOptions({
  id: 'html5-progress-element',
})(markdown(components)`
  Something I’ve learned that wasn’t included in the Learn curriculum was the ${(
    <InlineCode>progress</InlineCode>
  )} element. Now what that does is show the progress of a task. In the case of this page. It shows how far down the page a user has scrolled. This can be beneficial to a long webpage such as a blog post. Another reason one could use the progress element is to show a loading bar for something.

  # The HTML is pretty simple in itself, just set a max value and you're done

  ${(
    <Code syntax={htmlbars} language="html">{`
<body>
  <progress value="0" max="100"></progress>
  { content }
</body>
    `}</Code>
  )}

  # The CSS is straight forward as well but you have to remember to also clear out some vendor prefixed psuedo elements on the progress bar

  ${(
    <Code syntax={css} language="css">{`
progress::-webkit-progress-bar {
  background-color: transparent;
}

progress::-webkit-progress-value {
  background-color: ${colors.primary};
  // or you can do gradients 💯
  background-image: linear-gradient(135deg, #52E5E7 0%, #130CB7 100%);
}

progress::-moz-progress-bar {
  background-color: ${colors.primary};
  // or you can do gradients 💯
  background-image: linear-gradient(135deg, #52E5E7 0%, #130CB7 100%);
}

progress {
  /* Positioning */
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
  /* Dimensions */
  width: 100%;
  height: 3px;
  /* Reset the appearance */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
    `}</Code>
  )}

  # And now the fun part, setting the value based on your scroll distance

  ${(
    <Code syntax={javascript} language="javascript">{`
function youReadThisMuch() {
  const scroll = window.pageYOffset; // window.scrollY isnt supported in IE
  const bodyHeight = document.body.offsetHeight;
  const windowHeight = window.innerHeight;
  const scrollPercent = (scroll / (bodyHeight - windowHeight)) * 100;
  document.querySelector('progress').value = scrollPercent;
}

window.addEventListener('scroll', youReadThisMuch);
    `}</Code>
  )}

  # Setting this up in React is also super simple

  ${(
    <Code syntax={javascript} language="javascript">{`
class Progress extends React.Component {
  constructor(props) {
    super(props);
    // set the initial state to be 0
    this.state = { progress: 0 };
    // set up a event handler
    this.handleScroll = this.handleScroll.bind(this);
  }

  // add the listener when the component mounts
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, true);
  }

  // remove the listener when the component unmounts
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, true);
  }

  handleScroll() {
    const scroll = window.pageYOffset; // window.scrollY is less supported
    const bodyHeight = document.body.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollPercent = (scroll / (bodyHeight - windowHeight)) * 100;
    const maxMinscroll = Math.min(100, Math.max(0, scrollPercent));
    this.setState({ progress: maxMinscroll });
  }
  render() {
    return (
      <progress value={this.state.progress} max="100">
        // for styling im using style jsx but you should be able to do the same with another css-in-js method
        <style jsx>{' // this should be a backtick
        progress::-webkit-progress-bar {
          background-color: transparent;
        }

        progress::-webkit-progress-value {
          /*background-color: #E53A40;*/
          background-image: linear-gradient(135deg, #52E5E7 0%, #130CB7 100%);
        }

        progress::-moz-progress-bar {
          /*background-color: #E53A40;*/
          background-image: linear-gradient(135deg, #52E5E7 0%, #130CB7 100%);
        }

        progress {
          position: fixed;
          top: 0;
          right: 0;
          left: 0;
          z-index: 2;
          width: 100%;
          height: 3px;
          appearance: none;
        }
        // this should be a backtick '}</style>
      </progress>
    );
  }
}

export default Progress;
    `}</Code>
  )}
`);
