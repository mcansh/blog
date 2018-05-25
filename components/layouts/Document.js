import React, { Component, Fragment } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import Navigation from '../Navigation';
import Footer from '../Footer';
import { version, repository } from '../../package.json';
import { initGA, logPageView } from '../../lib/analytics';
import withIntl from './withIntl';

NProgress.configure({ showSpinner: false });
Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

if (global.document) {
  const info = [
    `Version: ${version}`,
    `You can find the code here: https://github.com/${repository}`,
    'Thanks for stopping by 🤙',
  ];
  // eslint-disable-next-line no-console
  info.forEach(message => console.log(message));
}

class Document extends Component {
  componentDidMount() {
    if (process.env.NODE_ENV === 'production' && !window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }

  componentDidUpdate = () => {
    if (process.env.NODE_ENV === 'production' && !window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  };

  render() {
    const { children } = this.props;
    return (
      <Fragment>
        <Navigation />
        {children}
        <Footer />
      </Fragment>
    );
  }
}

Document.propTypes = {
  children: PropTypes.node.isRequired,
};

export default withIntl(Document);
