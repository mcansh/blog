import React, { Component } from 'react';
import Head from 'next/head';
import Navigation from '~/components/Navigation';
import Footer from '~/components/Footer';
import { initGA, logPageView } from '~/lib/analytics';
import randomEmoji from '~/utils/emojis';
import { colors } from '~/config';

// @ts-ignore
if (global.document) {
  const info = [
    `Version: ${process.env.VERSION}`,
    `You can find the code here: ${process.env.GITHUB_URL}`,
    `Thanks for stopping by ${randomEmoji()}`,
  ];
  // eslint-disable-next-line no-console
  info.forEach(message => console.log(message));
}

interface Props {
  children: React.ReactNode;
}

class Document extends Component<Props> {
  componentDidMount = () => {
    this.analytics();
    this.serviceWorker();
  };

  componentDidUpdate = () => this.analytics();

  serviceWorker = () => {
    if (process.env.NODE_ENV === 'production') {
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker
            .register('/sw.js')
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
      // @ts-ignore
      if (!window.GA_INITIALIZED) {
        initGA();
        // @ts-ignore
        window.GA_INITIALIZED = true;
      }
      logPageView();
    }
  };

  render() {
    const { children } = this.props;
    const icons = [228, 195, 152, 144, 128, 120, 96, 72, 57, 32];
    return (
      <>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width, viewport-fit=cover"
          />
          <link rel="manifest" href="/manifest.json" />
          <link type="text/plain" rel="author" href="/static/humans.txt" />
          <link
            rel="mask-icon"
            href="/static/images/logo/safari.svg"
            color={colors.primary}
          />
          <meta name="theme-color" content={colors.primary} />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
          <link rel="shortcut icon" href="/static/images/logo/logo.png" />
          <link rel="shortcut icon" href="/static/images/logo/logo.ico" />
          {icons.map(icon => {
            const size = `${icon}x${icon}`;
            return (
              <link
                key={size}
                rel="apple-touch-icon-precomposed"
                sizes={size}
                href={`/static/images/logo/logo-${icon}.png`}
              />
            );
          })}
          <link
            rel="alternate"
            href="/atom"
            type="application/atom+xml"
            title="RSS Feed"
          />
          <link
            rel="alternate"
            href="/feed.json"
            type="application/json"
            title="JSON Feed"
          />
        </Head>
        <Navigation />
        {children}
        <Footer />
      </>
    );
  }
}

export default Document;
