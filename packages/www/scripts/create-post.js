import fs from 'fs';
import { promisify } from 'util';
import { resolve, join } from 'path';
import kleur from 'kleur';
import inquirer from 'inquirer';
import { PathPrompt } from 'inquirer-path';
import prettier from 'prettier';
import slugify from '@sindresorhus/slugify';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const format = (string, parser) => prettier.format(string, { parser });

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
    default: input => slugify(input.title),
  },
  {
    type: 'input',
    message: `Write a short (usually 1-2 line) description of your blogpost`,
    name: 'description',
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

inquirer
  .prompt(questions)
  .then(async answers => {
    const { title, slug, description, heroSrc } = answers;
    const date = Date.now();
    const postsPath = 'posts.json';

    const postsString = await readFile(postsPath, 'utf-8');
    const posts = JSON.parse(postsString);

    const updatedPosts = [
      ...posts,
      {
        id: slug,
        title,
        description,
        date,
        image: {
          imageUrl: heroSrc,
        },
      },
    ];

    const relativePathToMDX = `./pages/${slug}.mdx`;
    const pathToMDX = join(__dirname, '..', relativePathToMDX);

    const postTemplate = `
      import Post from '../components/layouts/Post';

      export default ({children}) => <Post id="${slug}">{children}</Post>
    `;

    const formattedPosts = format(JSON.stringify(updatedPosts), 'json');
    const formattedPost = format(postTemplate, 'babylon');

    await writeFile(pathToMDX, formattedPost);
    writeFile(postsPath, formattedPosts);

    const postPath = kleur.cyan(relativePathToMDX);
    console.log(kleur.green`Bootstrapping your blogpost...`);
    console.log(`Done! Go ahead and edit ${postPath} to complete the post.`);
  })
  .catch(error => console.error(error.stack));
