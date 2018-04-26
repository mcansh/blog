import App from 'next/app';
import Raven from 'raven';
import { version } from '../package.json';

export default class MyApp extends App {
  constructor(props) {
    super(props);
    Raven.config(process.env.SENTRY, {
      release: version,
      environment: process.env.NODE_ENV || 'development',
    }).install();
  }
  componentDidCatch(error, errorInfo) {
    super.componentDidCatch(error, errorInfo);
    Raven.captureException(error, { extra: errorInfo });
  }
}
