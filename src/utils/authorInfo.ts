import * as somebody from 'somebody';

const { name, email, url } = somebody.parse(process.env.AUTHOR);

export { name, email, url };
