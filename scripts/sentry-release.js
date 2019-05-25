const { execSync } = require('child_process');
const args = require('args');
const { version } = require('../package.json');

async function sentryRelease() {
  args
    .option(
      'project_version',
      "The version you'd like to register on Sentry",
      version
    )
    .option(
      'last_release_sha',
      'The commit sha of the last commit from the previous release'
    )
    .option(
      'this_release_sha',
      'The commit sha of the last commit from the current release'
    );

  const flags = args.parse(process.argv, {
    name: 'Sentry Releaser',
  });

  const { SENTRY_ORG, SENTRY_AUTH_TOKEN } = process.env;

  console.log(flags);

  if (!SENTRY_ORG) {
    throw new Error('A `SENTRY_ORG` environment variable is required');
  }

  if (!SENTRY_AUTH_TOKEN) {
    throw new Error('A `SENTRY_AUTH_TOKEN` environment variable is required');
  }

  try {
    execSync(`sentry-cli releases new -p blog ${flags.p}`);
    console.log(`Release created for ${flags.p}!`);
  } catch (error) {
    throw new Error(`An error occured creating that release :(`, error);
  }

  if (!flags.lastReleaseSha || !flags.thisReleaseSha) {
    console.log(
      `no commit shas were provided, letting sentry figure that out...`
    );
    try {
      execSync(`sentry-cli releases set-commits ${flags.p} --auto`);
    } catch (error) {
      throw new Error(
        `An error occured setting the commits for that release :(`,
        error
      );
    }
  } else {
    try {
      execSync(
        `sentry-cli releases set-commits ${flags.p} --commit "mcansh/blog@${
          flags.lastReleaseSha
        }..${flags.thisReleaseSha}"`
      );
    } catch (error) {
      throw new Error(
        `An error occured setting the commits for that release :(`,
        error
      );
    }
  }

  execSync(`sentry-cli releases deploys ${flags.p} new -e production`);
}

sentryRelease();
