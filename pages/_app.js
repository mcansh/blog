import App from 'next/app';
import Raven from 'raven';
import { version } from '../package.json';

export default class MyApp extends App {
  componentDidCatch(error, errorInfo) {
    Raven.config(process.env.SENTRY, {
      release: version,
      environment: process.env.NODE_ENV || 'development',
    }).install();
    super.componentDidCatch(error, errorInfo);
    Raven.captureException(error, { extra: errorInfo });
  }
}
