import React from 'react';
import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import { useRouter } from 'next/router';

import pkgJSON from '~/package.json';
import Navigation from '~/components/navigation';
import Footer from '~/components/footer';
import randomEmoji from '~/utils/emojis';
import { iconSizes } from '~/config';
import { defaultSEO } from '~/next-seo.config';

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
  const router = useRouter();

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
    <div className="flex flex-col min-h-screen">
      <DefaultSeo {...defaultSEO} />
      <Head>
        <meta key="charset" charSet="utf-8" />
        <link
          key="canonical"
          rel="canonical"
          href={`${pkgJSON.homepage}${router.asPath}`}
        />
        <link rel="manifest" key="manifest" href="/manifest.webmanifest" />
        <link
          rel="mask-icon"
          href="/static/images/logo/safari.svg"
          color="#0448f8"
        />
        <link rel="shortcut icon" href="/static/images/logo/logo.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        {iconSizes.map(icon => {
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
          key="application/atom+xml"
          rel="alternate"
          href="/atom"
          type="application/atom+xml"
          title="Atom Feed"
        />
        <link
          key="application/json"
          rel="alternate"
          href="/feed"
          type="application/json"
          title="JSON Feed"
        />
        <link
          key="application/rss+xml"
          rel="alternate"
          href="/rss"
          type="application/rss+xml"
          title="RSS Feed"
        />

        <link rel="preconnect" href={process.env.FATHOM_SUBDOMAIN} />
      </Head>
      <Navigation />
      <div className="flex-auto">{children}</div>
      <Footer />
    </div>
  );
};

export default Document;
