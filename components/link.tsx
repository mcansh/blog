import { format, UrlObject } from 'url';

import React from 'react';
import Link, { LinkProps } from 'next/link';

function checkSameOrigin(url: UrlObject | string) {
  const href = typeof url === 'string' ? url : format(url);
  return href && (href.startsWith('/') || href.startsWith('#'));
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
