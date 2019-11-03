/// <reference types="node" />

interface Window {
  GA_INITIALIZED: boolean;
  __NEXT_DATA__: any;
}

// Extend the NodeJS namespace with variables in next.config.js
declare namespace NodeJS {
  interface ProcessEnv {
    TWITTER: string;
    INSTAGRAM: string;
    GITHUB: string;
    EMAIL: string;
    SENTRY: string;
    ANALYTICS: string;
    GITHUB_URL: string;
    VERSION: string;
    ANALYZE: 'true' | 'false' | undefined;
    BUILD_ID: string;
  }
}
