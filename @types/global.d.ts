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
    readonly FATHOM_SUBDOMAIN: string;
    readonly VERCEL_URL: string;
    readonly ENV: 'production' | 'preview' | 'development';
    readonly VERCEL_GITHUB_COMMIT_SHA: string;
    readonly SENTRY_AUTH_TOKEN?: string;
    readonly NEXT_PUBLIC_SENTRY_DSN?: string;
    readonly SENTRY_PROJECT?: string;
    readonly SENTRY_ORG?: string;
  }
}
