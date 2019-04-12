import React, { useEffect } from 'react';
import { withAmp } from 'next/amp';
import Navigation from '~/components/navigation';
import Footer from '~/components/footer';
import randomEmoji from '~/utils/emojis';

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
      <Navigation />
      {children}
      <Footer />
    </>
  );
};

export default withAmp(Document, { hybrid: true });
