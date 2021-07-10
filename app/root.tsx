import * as React from 'react';
import type { LinksFunction } from 'remix';
import { Links, Meta, Scripts, LiveReload } from 'remix';
import { Outlet } from 'react-router-dom';

import tailwind from './styles/tailwind.css';

const links: LinksFunction = () => {
  const iconSizes = [228, 195, 152, 144, 128, 120, 96, 72, 57, 32];

  return [
    { rel: 'stylesheet', href: tailwind },
    ...iconSizes.map(icon => ({
      rel: 'apple-touch-icon-precomposed',
      sizes: icon.toString(),
      href: `/static/images/logo/logo-${icon}.png`,
    })),
    { rel: 'manifest', href: '/manifest.webmanifest' },
    { rel: 'mask-icon', href: '/static/images/logo/safari.svg', color: '#000' },
    { rel: 'shortcut icon', href: '/static/images/logo/logo.png' },
    { rel: 'shortcut icon', href: '/favicon.ico' },
    {
      rel: 'alternate',
      href: '/atom',
      type: 'application/atom+xml',
      title: 'Atom Feed',
    },
    {
      rel: 'alternate',
      href: '/feed',
      type: 'application/json',
      title: 'JSON Feed',
    },
    {
      rel: 'alternate',
      href: '/rss',
      type: 'application/rss+xml',
      title: 'RSS Feed',
    },
  ];
};

const App: React.VFC = () => (
  <html lang="en" className="min-h-full">
    <head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width, minimum-scale=1, viewport-fit=cover"
      />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <Meta />
      <Links />
    </head>
    <body className="h-full">
      <Outlet />
      <Scripts />
      <LiveReload />
    </body>
  </html>
);

interface ErrorBoundaryProps {
  error: Error;
}

const ErrorBoundary: React.VFC<ErrorBoundaryProps> = ({ error }) => (
  <html lang="en" className="h-full">
    <head>
      <meta charSet="utf-8" />
      <title>Oops!</title>
    </head>
    <body className="h-full">
      <div>
        <h1>App Error</h1>
        <pre>{error.message}</pre>
        <p>
          Replace this UI with what you want users to see when your app throws
          uncaught errors. The file is at <code>app/App.tsx</code>.
        </p>
      </div>

      <Scripts />
    </body>
  </html>
);
export default App;
export { ErrorBoundary, links };
