import { author } from '../package.json';

const [name, email, homepage] = author.split(/<|>/);

export { name, email, homepage };
