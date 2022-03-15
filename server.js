import { createEventHandler } from '@remix-run/cloudflare-workers';
// the build gets inlined when we run `remix build`
// eslint-disable-next-line import/no-extraneous-dependencies
import * as build from '@remix-run/dev/server-build';

addEventListener(
  'fetch',
  createEventHandler({ build, mode: process.env.NODE_ENV })
);
