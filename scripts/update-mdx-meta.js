const { parse } = require('path');
const { promises: fs } = require('fs');

const globby = require('globby');
const prettier = require('prettier');
const {
  add,
  amendCommit,
  getFilesInLastCommit,
  getLastModifiedDate,
  getStagedFiles,
} = require('git-jiggy');
const matter = require('gray-matter');

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
      const mdxFile = await fs.readFile(path);
      const editUrl = path.startsWith('./') ? path.slice(2) : path;
      const lastEdited = await getLastModifiedDate(path);
      const { data, ...file } = matter(mdxFile);

      const result = {
        ...data,
        editUrl,
        lastEdited,
      };

      const contents = await formatWithPrettier(
        matter.stringify({ data, ...file }, result)
      );

      await fs.writeFile(path, contents);
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
  const paths = await globby(['./_posts/**/*']);

  await updateMeta(paths);
};

(async () => {
  if (isPostCommit) {
    await updateModifiedFiles();
  } else {
    await updateAllFiles();
  }
})();
