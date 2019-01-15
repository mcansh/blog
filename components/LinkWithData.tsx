import Link, { LinkProps } from 'next/link';
import Router from 'next/router';
import { UrlObject, format, resolve, parse } from 'url';

export const prefetch = async (href: UrlObject) => {
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

// extend default next/link to customize the prefetch behaviour
class LinkWithData extends Link<LinkProps> {
  // our custom prefetch method
  async prefetch() {
    // if the prefetch prop is not defined do nothing
    if (this.props.prefetch == null) return;

    // if withData prop is defined
    // prefetch with data
    // otherwise just prefetch the page
    if (this.props.withData != null) {
      prefetch(this.props.href);
    } else {
      super.prefetch();
    }
  }
}

export default LinkWithData;
