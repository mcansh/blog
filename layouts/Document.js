import React from 'react';
import Raven from 'raven-js';
import PropTypes from 'prop-types';
import colors from '../theme';
import Meta from '../components/Meta';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { version, author } from '../package.json';

class Document extends React.Component {
  componentDidMount() {
    Raven
      .config(process.env.SENTRY, {
        release: version,
        environment: process.env.NODE_ENV,
      })
      .install();

    if (process.env.NODE_ENV === 'production') {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then(console.log('service worker registration successful')) // eslint-disable-line no-console
          .catch(err => console.warn(err)); // eslint-disable-line no-console
      }
    }
  }
  render() {
    return (
      <div>
        <Meta title={this.props.title} image={`https://mcansh.blog/static/images/${this.props.image}`} />
        <Navigation />
        <div>
          { this.props.children }
        </div>
        <style jsx>{`
          div {
            margin-bottom: 4em;
            background: ${colors.background};
          }
        `}</style>
        <Footer />
      </div>
    );
  }
}

Document.defaultProps = {
  title: author.name,
};

Document.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  image: PropTypes.string.isRequired,
};

export default Document;
