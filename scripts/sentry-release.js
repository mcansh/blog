/* eslint-disable no-console */
const { execSync } = require('child_process');

const args = require('args');

const { version: PKGVersion } = require('../package.json');

function sentryRelease() {
  args
    .examples([
      {
        usage: `node ./scripts/sentry-release.js ${PKGVersion}`,
        description: 'Let Sentry figure out the commits for the release',
      },
      {
        usage: `node ./scripts/sentry-release.js ${PKGVersion} ac8264c 474721f`,
        description: 'Explicitly tell Sentry the commits for the release',
      },
    ])
    .parse(process.argv, {
      version: false,
      name: 'Sentry Releaser',
    });

  const [version, last, current] = args.sub;

  const { SENTRY_ORG, SENTRY_AUTH_TOKEN } = process.env;

  if (!SENTRY_ORG) {
    throw new Error('A `SENTRY_ORG` environment variable is required');
  }

  if (!SENTRY_AUTH_TOKEN) {
    throw new Error('A `SENTRY_AUTH_TOKEN` environment variable is required');
  }

  try {
    execSync(`sentry-cli releases new -p blog ${version}`);
    console.log(`Release created for ${version}!`);
  } catch (error) {
    throw new Error(`An error occured creating that release :(`, error);
  }

  if (!last || !current) {
    console.log(
      `no commit shas were provided, letting sentry figure that out...`
    );
    try {
      execSync(`sentry-cli releases set-commits ${version} --auto`);
    } catch (error) {
      throw new Error(
        `An error occured setting the commits for that release :(`,
        error
      );
    }
  } else {
    try {
      execSync(
        `sentry-cli releases set-commits ${version} --commit "mcansh/blog@${last}..${current}"`
      );
    } catch (error) {
      throw new Error(
        `An error occured setting the commits for that release :(`,
        error
      );
    }
  }

  const env = version.includes('canary') ? 'staging' : 'production';

  execSync(`sentry-cli releases deploys ${version} new -e ${env}`);
}

sentryRelease();
