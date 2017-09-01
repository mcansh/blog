import React from 'react';
import Raven from 'raven-js';
import PropTypes from 'prop-types';
import Meta from '../components/Meta';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { version, author } from '../package.json';

class Document extends React.Component {
  componentDidMount() {
    Raven
      .config('https://07a54d3b59bb4bf5ad1c6ddf050d51c1@sentry.io/197817', {
        release: version,
        environment: process.env.NODE_ENV,
      })
      .install();

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(console.log('service worker registration successful')) // eslint-disable-line no-console
        .catch(err => console.warn(err)); // eslint-disable-line no-console
    }
  }
  render() {
    return (
      <div>
        <Meta title={this.props.title} image={this.props.image} />
        <Navigation />
        <div>
          { this.props.children }
        </div>
        <style jsx>{`
          div {
            margin-bottom: 4em;
            background: #F7F7F7;
          }
        `}</style>
        <Footer />
      </div>
    );
  }
}

Document.defaultProps = {
  title: `${author.name}`,
  image: 'https://avatars1.githubusercontent.com/u/11698668?v=3&amp;s=460',
};

Document.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  image: PropTypes.string,
};

export default Document;
