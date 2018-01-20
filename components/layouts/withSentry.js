import React from 'react';
import Raven from 'raven-js';
import { version } from '../../package.json';

const { SENTRY } = process.env;

const withSentry = Child =>
  class Sentry extends React.Component {
    static getInitialProps(ctx) {
      if (Child.getInitialProps) {
        return Child.getInitialProps(ctx);
      }
      return {};
    }

    constructor(props) {
      super(props);
      this.state = {
        error: null,
      };

      Raven.config(SENTRY, {
        release: version,
        environment: process.env.NODE_ENV || 'development',
      }).install();
    }

    componentDidCatch(error, errorInfo) {
      this.setState({ error });
      Raven.captureException(error, { extra: errorInfo });
    }

    render() {
      return <Child {...this.props} error={this.state.error} />;
    }
  };

export default withSentry;
