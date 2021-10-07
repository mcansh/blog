import type {
  ErrorBoundaryComponent,
  LinksFunction,
  MetaFunction,
  RouteComponent,
} from 'remix';
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
  ];
};

const meta: MetaFunction = () => ({
  viewport:
    'initial-scale=1.0, width=device-width, minimum-scale=1, viewport-fit=cover',
  'apple-mobile-web-app-status-bar-style': 'black-translucent',
});

const App: RouteComponent = () => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <Meta />
      <Links />
    </head>
    <body>
      <Outlet />
      <Scripts />
      <LiveReload />
    </body>
  </html>
);

const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => (
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
export { meta, ErrorBoundary, links };
