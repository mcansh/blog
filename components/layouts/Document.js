import React, { Component, Fragment } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import Navigation from '../Navigation';
import colors from '../../theme';
import Footer from '../Footer';
import { version } from '../../package.json';
import { initGA, logPageView } from '../../lib/analytics';
import withIntl from './withIntl';

NProgress.configure({ showSpinner: false });
Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

if (global.document) {
  const info = [
    `Version: ${version}`,
    'You can find the code here: https://github.com/mcansh/blog',
    'Thanks for stopping by 🤙',
  ];
  // eslint-disable-next-line no-console
  info.forEach(message => console.log(message));
}

class Document extends Component {
  componentDidMount() {
    if (process.env.NODE_ENV === 'production') {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker
          .register('/sw.js')
          .then(console.log('service worker registration successful')) // eslint-disable-line no-console
          .catch(err => console.warn(err)); // eslint-disable-line no-console
      }
      if (!window.GA_INITIALIZED) {
        initGA();
        window.GA_INITIALIZED = true;
      }
      logPageView();
    }
  }

  render() {
    const { children } = this.props;
    return (
      <ThemeProvider theme={colors}>
        <Fragment>
          <Navigation />
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
              font-family: system-ui, -apple-system, BlinkMacSystemFont,
                'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
                'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif,
                'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
              font-weight: 400;
              margin: 0;
              background: ${colors.background};
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
              background: ${colors.primary};

              position: fixed;
              z-index: 1031;
              top: 0;
              left: 0;

              width: 100%;
              height: 0.2rem;
            }

            #nprogress {
              pointer-events: none;
            }

            #nprogress .bar {
              background: ${colors.primary};
              position: fixed;
              z-index: 1031;
              top: 0;
              left: 0;
              width: 100%;
              height: 0.2rem;
            }

            #nprogress .peg {
              display: block;
              position: absolute;
              right: 0;
              width: 10rem;
              height: 100%;
              box-shadow: 0 0 1rem ${colors.primary},
                0 0 0.5rem ${colors.primary};
              opacity: 1;
              transform: rotate(3deg) translate(0, -0.4rem);
            }

            .nprogress-custom-parent {
              overflow: hidden;
              position: relative;
            }

            .nprogress-custom-parent #nprogress .spinner,
            .nprogress-custom-parent #nprogress .bar {
              position: absolute;
            }
          `}</style>
        </Fragment>
      </ThemeProvider>
    );
  }
}

Document.propTypes = { children: PropTypes.node.isRequired };

export default withIntl(Document);
