// @flow
import React, { Component, type Node } from 'react';
import Navigation from '../Navigation';
import Footer from '../Footer';
import { version, repository } from '../../package.json';
import { initGA, logPageView } from '../../lib/analytics';
import randomEmoji from '../../utils/emojis';

if (global.document) {
  const info = [
    `Version: ${version}`,
    `You can find the code here: https://github.com/${repository}`,
    `Thanks for stopping by ${randomEmoji()}`,
  ];
  // eslint-disable-next-line no-console
  info.forEach(message => console.log(message));
}

type Props = { children: Node };
class Document extends Component<Props, null> {
  componentDidMount = () => {
    this.analytics();
    this.serviceWorker();
  };

  componentDidUpdate = () => this.analytics();

  serviceWorker = () => {
    if (process.env.NODE_ENV === 'production') {
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          // $FlowFixMe
          navigator.serviceWorker
            .register('/service-worker.js')
            .then(() => {
              console.log('SW registered');
            })
            .catch(registrationError => {
              console.log('SW registration failed: ', registrationError);
            });
        });
      }
    }
  };

  analytics = () => {
    if (process.env.NODE_ENV === 'production') {
      if (!window.GA_INITIALIZED) {
        initGA();
        window.GA_INITIALIZED = true;
      }
      logPageView();
    }
  };

  render() {
    const { children } = this.props;
    return (
      <>
        <Navigation />
        {children}
        <Footer />
      </>
    );
  }
}

export default Document;
