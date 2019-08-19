import { format, parse } from 'url';
import React from 'react';
import Link, { LinkProps } from 'next/link';

type MyLinkProps = React.PropsWithChildren<LinkProps>;

const MyLink = ({
  children,
  href,
  as,
  replace,
  scroll,
  shallow,
  passHref,
  prefetch,
  ...props
}: MyLinkProps) => {
  const parsedHref = typeof href === 'string' ? parse(href) : href;

  const isSameOrigin =
    !parsedHref.hostname || parsedHref.hostname === 'mcansh.blog';

  const nextLinkProps = {
    href,
    as,
    replace,
    scroll,
    shallow,
    passHref,
    prefetch,
  };

  if (isSameOrigin) {
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
