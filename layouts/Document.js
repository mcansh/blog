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
    const { image, title, children } = this.props;

    return (
      <div>
        <Meta
          title={title}
          image={`https://mcansh.blog/static/images/${image}`}
        />
        <Navigation />
        <div>{children}</div>
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
  image: 'me.png',
};

Document.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  image: PropTypes.string,
};

export default Document;
