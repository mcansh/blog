import { readJsonSync, writeFileSync, createFileSync } from 'fs-extra';
import { resolve, join } from 'path';
import kleur from 'kleur';
import inquirer from 'inquirer';
import { PathPrompt } from 'inquirer-path';
import { format } from 'prettier';
import { stripIndent } from 'common-tags';

inquirer.registerPrompt('path', PathPrompt);

const questions = [
  {
    type: 'input',
    message: `What's your blogpost title?`,
    name: 'title',
    validate: input => Boolean(input),
  },
  {
    type: 'input',
    message: `Blog post slug`,
    name: 'slug',
    validate: input =>
      Boolean(input) ||
      'Please specify a slug! We use the slug for the post url.',
  },
  {
    type: 'input',
    message: `Write a short (usually 1-2 line) description of your blogpost`,
    name: 'desc',
  },
  {
    type: 'path',
    message: `Write the path to the hero image (from static/images/posts):`,
    name: 'heroSrc',
    cwd: './static/images/posts',
    filter: input => {
      const dirname = resolve(__dirname, '..', 'static', 'images', 'posts');
      return input.replace(dirname, '').replace('/', '');
    },
  },
];

inquirer.prompt(questions).then(async answers => {
  const { title, slug, description, heroSrc } = answers;
  const date = Date.now();
  const postsPath = 'posts.json';

  const posts = readJsonSync(postsPath);

  posts.push({
    id: slug,
    title,
    description,
    date,
    image: {
      imageUrl: heroSrc,
    },
  });

  const json = JSON.stringify(posts);

  const prettyJSON = format(json, { parser: 'json' });

  writeFileSync(postsPath, prettyJSON);

  const relativePathToMDX = `./pages/${slug}.mdx`;
  const pathToMDX = join(__dirname, '..', relativePathToMDX);
  createFileSync(pathToMDX);
  writeFileSync(
    pathToMDX,
    stripIndent`
      import Post from '../components/layouts/Post';

      export default ({children}) => <Post id="${slug}">{children}</Post>
    `
  );

  console.log(kleur.green`Bootstrapping your blogpost...`);
  console.log(
    `Done! Go ahead and edit ${kleur.cyan(
      relativePathToMDX
    )} to complete the post.`
  );
});
