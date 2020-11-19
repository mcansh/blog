import React from 'react';
import type { NProgressOptions } from 'nprogress';
import nProgress from 'nprogress';
import Router from 'next/router';

import { ProgressContainer } from './style';

interface Props {
  showAfterMs?: number;
  options?: Partial<NProgressOptions>;
  color?: string;
  spinner?: boolean;
}

const NProgress = ({
  color = '#2299dd',
  options = {},
  showAfterMs = 300,
  spinner = true,
}: Props): JSX.Element => {
  const timer = React.useRef<number | undefined>();
  const routeChangeStart = React.useCallback(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(nProgress.start(), showAfterMs);
  }, [showAfterMs]);

  const routeChangeEnd = React.useCallback(() => {
    clearTimeout(timer.current);
    nProgress.done();
  }, []);

  React.useEffect(() => {
    if (options) {
      nProgress.configure(options);
    }

    Router.events.on('routeChangeStart', routeChangeStart);
    Router.events.on('routeChangeComplete', routeChangeEnd);
    Router.events.on('routeChangeError', routeChangeEnd);

    return () => {
      clearTimeout(timer.current);
      Router.events.off('routeChangeStart', routeChangeStart);
      Router.events.off('routeChangeComplete', routeChangeEnd);
      Router.events.off('routeChangeError', routeChangeEnd);
    };
  }, [options, routeChangeEnd, routeChangeStart]);

  return <ProgressContainer color={color} spinner={spinner} />;
};

export { NProgress };
