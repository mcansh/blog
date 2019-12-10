import { format, parse, UrlObject } from 'url';

import React from 'react';
import Link, { LinkProps } from 'next/link';

function checkSameOrigin(url: UrlObject | string) {
  const href = typeof url === 'string' ? parse(url) : url;
  if (!href.protocol || !href.hostname) return true;
  if (!/^https?/.test(href.protocol)) return false;
  const domain =
    process.env.NODE_ENV === 'development' ? 'localhost:3000' : 'mcansh.blog';
  return href.hostname === domain;
}

const MyLink: React.FC<LinkProps> = ({
  children,
  href,
  as,
  replace,
  scroll,
  shallow,
  passHref,
  prefetch,
  ...props
}) => {
  const isSameOrigin = checkSameOrigin(href);

  const nextLinkProps = {
    href,
    as,
    replace,
    scroll,
    shallow,
    passHref,
    prefetch,
  };

  if (!isSameOrigin) {
    const formatted = typeof href === 'string' ? href : format(href);
    return (
      <a
        {...props}
        href={formatted}
        target="_blank"
        rel="noopener external noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link {...nextLinkProps}>
      <a {...props}>{children}</a>
    </Link>
  );
};

export default MyLink;
export { checkSameOrigin };
