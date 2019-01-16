/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { LinkProps } from 'next/link';
import Router from 'next/router';
import { format, resolve, parse, UrlObject } from 'url';

interface Props extends LinkProps {
  withData?: boolean;
}

export const prefetch = async (href: string | UrlObject) => {
  // if  we're running server side do nothing
  if (typeof window === 'undefined') return;

  const url = typeof href !== 'string' ? format(href) : href;

  const { pathname } = window.location;

  const parsedHref = resolve(pathname, url);

  const { query } = typeof href !== 'string' ? href : parse(url, true);

  const Component = await Router.prefetch(parsedHref);

  // if Component exists and has getInitialProps
  // fetch the component props (the component should save it in cache)
  // @ts-ignore
  if (Component && Component.getInitialProps) {
    const ctx = { pathname: href, query, isVirtualCall: true };
    // @ts-ignore
    await Component.getInitialProps(ctx);
  }
};

// extend default next/link to customize the prefetch behaviour
export default class LinkWithData extends React.Component<Props> {
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
      // @ts-ignore
      super.prefetch();
    }
  }
}
