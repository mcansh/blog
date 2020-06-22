import * as somebody from 'somebody';

import { author } from '~/package.json';

const { email, url } = somebody.parse(author);

const name = 'Logan McAns'

export { name, email, url };
