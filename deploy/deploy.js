const cp = require('child_process');
const { resolve } = require('path');
const fs = require('mz/fs');
const GitHubApi = require('github');
const jwt = require('jsonwebtoken');

const { ZEIT_TOKEN, GH_KEY } = process.env;

module.exports = async (PRID, tarballName) => {
  console.log(`${PRID} => moving the tarball`);
  await fs.mkdir(`/tmp/${tarballName}`);
  await fs.rename(
    `/tmp/${tarballName}.tar.gz`,
    `/tmp/${tarballName}/app.tar.gz`,
  );

  const execOptions = {
    cwd: `/tmp/${tarballName}`,
  };

  console.log(`${PRID} => extracting the tarball`);
  await exec('tar xzf app.tar.gz', execOptions);

  const nowPath = resolve(__dirname, 'node_modules/.bin/now');

  console.log(`${PRID} => deploying the app`);

  const nowApp = await execOptions(`${nowPath} -p -n staging.mcansh.blog -t ${ZEIT_TOKEN}`, {
    cwd: `${execOptions.cwd}/out`,
  });

  const deployURL = nowApp.stdout;

  const github = new GitHubApi({
    protocol: 'https',
    headers: {
      'user-agent': 'mcansh-blog-deployer',
    },
    Promise,
    followRedirects: true,
    timeout: 5000,
  });

  const key = Buffer.from(GH_KEY, 'base64').toString('utf8');
  console.log(`${pullRequestId}=> get the github token`);
  const token = await getToken(github, key, 3412, 36421);

  github.authenticate({
    type: 'token',
    token,
  });

  console.log(`${PRID} => creating the deploy commit`);
  await github.issues.createComment({
    owner: 'mcansh',
    repo: 'blog',
    number: PRID,
    body: `You can view the new app at: ${deployURL}`,
  });

  await execOptions(`rm -rf ${execOptions.cwd}`);
};

function exec(command, options = {}) {
  return new Promise((done, failed) => {
    cp.exec(command, options, (error, stdout, stderr) => {
      if (error) {
        error.stdout = stdout; // eslint-disable-line no-param-reassign
        error.stderr = stderr; // eslint-disable-line no-param-reassign
        failed(error);
      }
      done({ stdout, stderr });
    });
  });
}

async function getToken(github, key, appId, installationId) {
  const now = Math.ceil(Date.now() / 1000);
  const jwtPayload = {
    iat: now,
    exp: (now + 8) * 60,
    iss: appId,
  };
  const token = jwt.sign(jwtPayload, key, { algorithm: 'RS256' });

  github.authenticate({
    type: 'integration',
    token,
  });

  const tokenInfo = await github.intergrations.createInstallationToken({
    installation_id: installationId,
  });

  return tokenInfo.data.token;
}
