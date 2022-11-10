import type { LinksFunction, MetaFunction } from "@remix-run/cloudflare";
import { Meta, Links, Outlet, Scripts, LiveReload } from "@remix-run/react";

import tailwind from "./styles/tailwind.css";

export const links: LinksFunction = () => {
  let iconSizes = [228, 195, 152, 144, 128, 120, 96, 72, 57, 32];

  return [
    { rel: "stylesheet", href: tailwind },
    ...iconSizes.map((icon) => {
      return {
        rel: "apple-touch-icon-precomposed",
        sizes: icon.toString(),
        href: `/static/images/logo/logo-${icon}.png`,
      };
    }),
    { rel: "manifest", href: "/manifest.webmanifest" },
    { rel: "mask-icon", href: "/static/images/logo/safari.svg", color: "#000" },
    { rel: "shortcut icon", href: "/static/images/logo/logo.png" },
    { rel: "shortcut icon", href: "/favicon.ico" },
  ];
};

export const meta: MetaFunction = () => {
  return {
    viewport:
      "initial-scale=1.0, width=device-width, minimum-scale=1, viewport-fit=cover",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  };
};

export default function App() {
  return (
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
}
