/// <reference types="node" />

// Extend the NodeJS namespace with variables in next.config.js
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_TWITTER: string;
    readonly NEXT_PUBLIC_INSTAGRAM: string;
    readonly NEXT_PUBLIC_GITHUB: string;
    readonly NEXT_PUBLIC_EMAIL: string;
    readonly NEXT_PUBLIC_FATHOM_SITE_ID: string;
    readonly NEXT_PUBLIC_FATHOM_SUBDOMAIN: string;

    // the following env variables are defined either on vercel.com or in next.config.js
    readonly ENV: 'production' | 'preview' | 'development';
    readonly GITHUB_URL: string;
    readonly VERSION: string;
    readonly ANALYZE: 'true' | 'false' | undefined;
    readonly SENTRY_RELEASE: string;
    readonly VERCEL_URL: string;
    readonly VERCEL_GITHUB_COMMIT_SHA: string;
    readonly SENTRY_AUTH_TOKEN?: string;
    readonly NEXT_PUBLIC_SENTRY_DSN?: string;
    readonly SENTRY_PROJECT?: string;
    readonly SENTRY_ORG?: string;
  }
}
