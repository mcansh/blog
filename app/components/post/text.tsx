import * as React from 'react';
import type { Except } from 'type-fest';

type ParagraphProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>;

type Props = Except<ParagraphProps, 'className'>;

const Text: React.FC<Props> = ({ children, ...props }) => (
  <p className="mb-2 text-base" {...props}>
    {children}
  </p>
);

export { Text };
