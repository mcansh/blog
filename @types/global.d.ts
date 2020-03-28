/// <reference types="node" />

// Extend the NodeJS namespace with variables in next.config.js
declare namespace NodeJS {
  interface ProcessEnv {
    readonly TWITTER: string;
    readonly INSTAGRAM: string;
    readonly GITHUB: string;
    readonly EMAIL: string;
    readonly SENTRY_DSN: string;
    readonly ANALYTICS: string;
    readonly GITHUB_URL: string;
    readonly VERSION: string;
    readonly ANALYZE: 'true' | 'false' | undefined;
    readonly SENTRY_RELEASE: string;
    readonly FATHOM_SITE_ID: string;
  }
}
