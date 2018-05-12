import ReactGA from 'react-ga';

const { ANALYTICS } = process.env;

export const initGA = () => {
  console.log('GA init');
  ReactGA.initialize(ANALYTICS);
};

export const logPageView = () => {
  const { pathname } = window.location;
  console.log(`Logging pageview for ${pathname}`);
  ReactGA.set({ page: pathname });
  ReactGA.pageview(pathname);
};

export const logEvent = (category = '', action = '') => {
  if (category && action) {
    ReactGA.event({ category, action });
  }
};

export const logException = (description = '', fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal });
  }
};
