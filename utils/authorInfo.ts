import * as somebody from 'somebody';
import { author } from '~/package.json';

const { name, email, url: homepage } = somebody.parse(author);

export { name, email, homepage };
