import { author } from '../package.json';

const [name, email, homepage] = author.split(/\s<\b|\b>\s\(\b|\b\)/);

export { name, email, homepage };
