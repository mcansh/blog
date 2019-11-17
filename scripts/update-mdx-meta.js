const { parse } = require('path');

const globby = require('globby');
const prettier = require('prettier');
const remark = require('remark');
const mdx = require('remark-mdx');
const mdxMetadata = require('remark-mdx-metadata');
const stringify = require('remark-stringify');
const { read, write } = require('to-vfile');
const {
  add,
  amendCommit,
  getFilesInLastCommit,
  getLastModifiedDate,
  getStagedFiles,
} = require('git-jiggy');

const isPostCommit = process.argv.slice(2).includes('post-commit');

const getMdxFilesFromCommit = async () => {
  const files = await getFilesInLastCommit();

  return files.filter(file => parse(file).ext === '.mdx');
};

const formatWithPrettier = async content => {
  const config = await prettier.resolveConfig('./prettier.config.js');

  return prettier.format(content, {
    ...config,
    parser: 'mdx',
  });
};

const updateMeta = async paths => {
  await Promise.all(
    paths.map(async path => {
      const file = await read(path);
      const editUrl = path.startsWith('./') ? path.slice(2) : path;
      const lastEdited = await getLastModifiedDate(path);
      const result = await remark()
        .use(mdx)
        .use(mdxMetadata, {
          meta: {
            editUrl,
            lastEdited,
          },
        })
        .use(stringify, {
          fences: true,
          listItemIndent: '1',
        })
        .process(file);
      const contents = await formatWithPrettier(result.toString());

      await write({
        path,
        contents,
      });
    })
  );
};

const updateModifiedFiles = async () => {
  const paths = await getMdxFilesFromCommit();

  if (paths) {
    await updateMeta(paths);
    await add(paths);

    const stagedFiles = await getStagedFiles();

    if (stagedFiles.length) {
      await amendCommit();
    }
  }
};

const updateAllFiles = async () => {
  const paths = await globby(['./pages/**/*.mdx']);

  await updateMeta(paths);
};

(async () => {
  if (isPostCommit) {
    await updateModifiedFiles();
  } else {
    await updateAllFiles();
  }
})();
