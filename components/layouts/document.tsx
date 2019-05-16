import React, { useEffect } from 'react';
import { withAmp } from 'next/amp';
import Navigation from '~/components/navigation';
import Footer from '~/components/footer';
import randomEmoji from '~/utils/emojis';
import Meta from '~/components/meta';

if (!global.Intl) {
  global.Intl = require('intl');
}

// @ts-ignore
if (global.document) {
  const info = [
    `Version: ${process.env.VERSION}`,
    `You can find the code here: ${process.env.GITHUB_URL}`,
    `Thanks for stopping by ${randomEmoji()}`,
  ];
  info.forEach(message => console.log(message));
}

interface Props {
  children: React.ReactNode;
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

const Document = ({ children }: Props) => {
  const isProd = process.env.NODE_ENV === 'production';
  useEffect(() => {
    if (isProd) {
      serviceWorker();
    } else {
      console.log('something something serviceWorker');
    }
  }, [isProd]);

  return (
    <>
      <Meta />
      <Navigation />
      {children}
      <Footer />
    </>
  );
};

export default withAmp(Document, { hybrid: true });
