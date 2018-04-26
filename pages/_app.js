import App from 'next/app';
import Raven from 'raven';
import { version } from '../package.json';

const isDev = process.env.NODE_ENV !== 'development';

export default class MyApp extends App {
  constructor(props) {
    super(props);

    if (isDev) {
      Raven.config(process.env.SENTRY, {
        release: version,
        environment: process.env.NODE_ENV,
      }).install();
    }
  }

  componentDidCatch(error, errorInfo) {
    super.componentDidCatch(error, errorInfo);

    if (isDev) {
      Raven.captureException(error, { extra: errorInfo });
    } else {
      console.error({ error, errorInfo });
    }
  }
}
