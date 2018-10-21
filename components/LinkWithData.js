// @flow
import type { Node } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { format, resolve, parse } from 'url';

// $FlowIssue
export const prefetch = async (href: string | Object) => {
  // if  we're running server side do nothing
  if (typeof window === 'undefined') return;

  const url = typeof href !== 'string' ? format(href) : href;

  const { pathname } = window.location;

  const parsedHref = resolve(pathname, url);

  const { query } = typeof href !== 'string' ? href : parse(url, true);

  const Component = await Router.prefetch(parsedHref);

  // if Component exists and has getInitialProps
  // fetch the component props (the component should save it in cache)
  if (Component && Component.getInitialProps) {
    const ctx = { pathname: href, query, isVirtualCall: true };
    await Component.getInitialProps(ctx);
  }
};

type Props = {
  withData?: boolean, // our custom prop
  // $FlowIssue
  href: string | Object,
  // $FlowIssue
  as: string | Object,
  prefetch?: boolean,
  replace?: boolean,
  shallow?: boolean,
  passHref?: boolean,
  scroll?: boolean,
  children: Node,
};

// extend default next/link to customize the prefetch behaviour
// $FlowIssue
class LinkWithData extends Link<Props> {
  // our custom prefetch method
  async prefetch() {
    // if the prefetch prop is not defined do nothing
    if (!this.props.prefetch) return;

    // if withData prop is defined
    // prefetch with data
    // otherwise just prefetch the page
    if (this.props.withData) {
      prefetch(this.props.href);
    } else {
      // $FlowIssue
      super.prefetch();
    }
  }
}

export default LinkWithData;
