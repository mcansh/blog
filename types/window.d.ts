import { NEXT_DATA } from 'next/dist/next-server/lib/utils';

interface Window {
  GA_INITIALIZED: boolean;
  __NEXT_DATA__: NEXT_DATA;
}
