import React from 'react';
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
  // eslint-disable-next-line no-console
  info.forEach(message => console.log(message));
}

const Document: React.FC = ({ children }) => {
  React.useEffect(() => {
    const serviceWorker = async () => {
      if (process.env.NODE_ENV === 'production') {
        if ('serviceWorker' in window.navigator) {
          try {
            await window.navigator.serviceWorker.register('/sw.js');
            // eslint-disable-next-line no-console
            console.log(`successfully registered serviceWorker`);
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log(`failed to register serviceWorker`);
          }
        }
      }
    };

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
