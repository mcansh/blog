import * as React from 'react';
import type { Except, SetRequired } from 'type-fest';

type AnchorProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

type Props = SetRequired<Except<AnchorProps, 'className'>, 'href'>;

const Link: React.FC<Props> = ({ children, href, ...props }) => (
  <a
    href={href}
    className="mb-2 text-indigo-600 underline transition-colors duration-75 ease-in-out hover:text-indigo-400"
    {...props}
  >
    {children}
  </a>
);

export { Link };
