// @flow
import ReactGA from 'react-ga';

type LogEvent = {
  category: string,
  action: string,
};

type LogException = {
  description: string,
  fatal?: boolean,
};

export const initGA = () => {
  console.log('GA init');
  ReactGA.initialize(process.env.ANALYTICS);
};

export const logPageView = () => {
  const { pathname } = window.location;
  console.log(`Logging pageview for ${pathname}`);
  ReactGA.set({ page: pathname });
  ReactGA.pageview(pathname);
};

export const logEvent = ({ category, action }: LogEvent) => {
  if (category && action) {
    ReactGA.event({ category, action });
  }
};

export const logException = ({ description, fatal = false }: LogException) => {
  if (description) {
    ReactGA.exception({ description, fatal });
  }
};
