import * as React from 'react';
import * as Fathom from 'fathom-client';
import { useLocation } from 'react-router';

function useFathom(siteId: string, url?: string) {
  const { pathname } = useLocation();

  React.useEffect(() => {
    Fathom.load(siteId, {
      url: url ? url : undefined,
      excludedDomains: ['localhost'],
    });
  }, [siteId, url]);

  React.useEffect(() => {
    Fathom.trackPageview();
  }, [pathname]);
}

export { useFathom };
