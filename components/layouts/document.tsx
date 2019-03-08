import React, { useEffect } from 'react';
import Navigation from '~/components/navigation';
import Footer from '~/components/footer';
import { initGA, logPageView } from '~/lib/analytics';
import randomEmoji from '~/utils/emojis';
import { withRouter, RouterProps } from 'next/router';

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
  router: RouterProps;
}

const serviceWorker = async () => {
  if ('serviceWorker' in window.navigator) {
    try {
      await window.navigator.serviceWorker.register('/sw.js');
      console.log(`successfully registered serviceWorker`);
    } catch (error) {
      console.log(`failed to register serviceWorker`);
    }
  }
};

const Document = ({ children, router }: Props) => {
  const isProd = process.env.NODE_ENV === 'production';
  useEffect(() => {
    if (isProd) {
      serviceWorker();
    } else {
      console.log('something something serviceWorker');
    }
  }, [isProd]);

  useEffect(() => {
    if (isProd) {
      if (!window.GA_INITIALIZED) {
        initGA();
        window.GA_INITIALIZED = true;
      }
      logPageView(router.pathname);
    } else {
      console.log('something something google analytics');
    }
  }, [isProd, router.pathname]);

  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
};

export default withRouter(Document);
