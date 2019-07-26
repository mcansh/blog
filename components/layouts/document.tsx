import React, { useEffect } from 'react';
import Navigation from '~/components/navigation';
import Footer from '~/components/footer';
import randomEmoji from '~/utils/emojis';
import Meta from '~/components/meta';

if (!global.Intl) {
  global.Intl = require('intl');
}

if (typeof window !== 'undefined') {
  const info = [
    `Version: ${process.env.VERSION}`,
    `Next.js Build: ${process.env.BUILD_ID}`,
    `You can find the code here: ${process.env.GITHUB_URL}`,
    `Thanks for stopping by ${randomEmoji()}`,
  ];
  info.forEach(message => console.log(message));
}

export const config = { amp: 'hybrid' };

interface Props {
  children: React.ReactNode;
}

const serviceWorker = async () => {
  if (process.env.NODE_ENV === 'production') {
    if ('serviceWorker' in window.navigator) {
      try {
        await window.navigator.serviceWorker.register('/sw.js');
        console.log(`successfully registered serviceWorker`);
      } catch (error) {
        console.log(`failed to register serviceWorker`);
      }
    }
  }
};

const Document = ({ children }: Props) => {
  useEffect(() => {
    serviceWorker();
  }, []);

  return (
    <>
      <Meta />
      <Navigation />
      {children}
      <Footer />
    </>
  );
};

export default Document;
