import React from 'react';

import Navigation from '~/components/navigation';
import Footer from '~/components/footer';
import randomEmoji from '~/utils/emojis';
import Meta from '~/components/meta';

if (typeof window !== 'undefined') {
  const info = [
    `Version: ${process.env.VERSION}`,
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
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Meta />
      <Navigation />
      <div css={{ flex: '1 1 auto' }}>{children}</div>
      <Footer />
    </div>
  );
};

export default Document;
