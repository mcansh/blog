import send from '@polka/send-type';
import { createReadStream } from 'fs';
import { parse } from 'url';
import { join } from 'path';

const serviceWorker = async (req, res) => {
  const { pathname } = parse(req.url, true);
  const filePath = join(__dirname, '..', '.next', pathname);
  const file = await createReadStream(filePath);
  send(res, 200, file, { 'Content-Type': 'application/javascript' });
};

export default serviceWorker;
