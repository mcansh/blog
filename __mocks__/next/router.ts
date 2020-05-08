import { NextRouter } from 'next/router';

function noop() {
  return {};
}

const router: NextRouter = {
  asPath: '/',
  back: noop,
  beforePopState: noop,
  events: {
    emit: noop,
    off: noop,
    on: noop,
  },
  isFallback: false,
  pathname: '/',
  prefetch: () => new Promise(resolve => resolve(undefined)),
  push: () => new Promise(resolve => resolve(true)),
  query: {},
  reload: noop,
  replace: () => new Promise(resolve => resolve(true)),
  route: '/',
  basePath: '',
};

export function useRouter() {
  return router;
}

export function withRouter(Component: React.FC) {
  Component.defaultProps = {
    ...Component.defaultProps,
    router,
  };
  return Component;
}
