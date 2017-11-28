import React, { Component } from 'react';
import Raven from 'raven-js';
import Router from 'next/router';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import colors from '../../theme';
import Footer from '../Footer';
import { version } from '../../package.json';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

if (global.document) {
  const info = [
    `Version: ${version}`,
    'You can find the code here: https://github.com/mcansh/blog',
    'Have a great day! 😄',
  ];
  // eslint-disable-next-line no-console
  info.forEach(message => console.log(message));
}

class Document extends Component {
  componentDidMount() {
    if (process.env.NODE_ENV === 'production') {
      Raven.config(process.env.SENTRY, {
        release: version,
        environment: process.env.NODE_ENV,
      }).install();

      if ('serviceWorker' in navigator) {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then(console.log('service worker registration successful')) // eslint-disable-line no-console
          .catch(err => console.warn(err)); // eslint-disable-line no-console
      }
    }
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        {children}
        <Footer />
        <style jsx global>{`
          * {
            box-sizing: border-box;
            margin: 0;
          }
          html {
            font-size: 10px;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI',
              Helvetica, Arial, sans-serif, 'Apple Color Emoji',
              'Segoe UI Emoji', 'Segoe UI Symbol';
            font-weight: 400;
            margin: 0;
          }
          ::selection {
            background: ${colors.primary};
            color: white;
          }
          a {
            color: ${colors.primary};
            text-decoration-skip: ink;
            transition: 300ms all ease-in-out;
          }
          a:hover {
            color: ${colors.secondary};
          }
          a::selection {
            color: white;
          }
          #nprogress {
            pointer-events: none;
          }
          #nprogress .bar {
            background-image: ${colors.primary};
            position: fixed;
            z-index: 1031;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
          }
          #nprogress .peg {
            display: block;
            position: absolute;
            right: 0px;
            width: 100px;
            height: 100%;
            box-shadow: 0 0 10px #ff9300, 0 0 5px #ff9300;
            opacity: 1;
            transform: rotate(3deg) translate(0px, -4px);
          }
        `}</style>
      </div>
    );
  }
}

Document.propTypes = { children: PropTypes.node.isRequired };

export default Document;
