const { execSync } = require('child_process');
const args = require('args');
const { version: PKGVersion } = require('../package.json');

async function sentryRelease() {
  args
    .option(
      'version',
      "The version you'd like to register on Sentry",
      PKGVersion
    )
    .option(
      'sha',
      'last commit from release previous sha..last commit from the new release'
    );

  const { sha, version } = args.parse(process.argv, {
    name: 'Sentry Releaser',
  });

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

  if (!sha) {
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
    const [last, current] = sha.split('..');
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

  execSync(`sentry-cli releases deploys ${version} new -e production`);
}

sentryRelease();
