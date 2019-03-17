import ReactGA from 'react-ga';

interface LogEventTypes {
  category: string;
  action: string;
}

export const logEvent = ({ category, action }: LogEventTypes) => {
  if (category && action) {
    ReactGA.event({ category, action });
  }
};

interface LogExceptionTypes {
  description: string;
  fatal?: boolean;
}

export const logException = ({
  description,
  fatal = false,
}: LogExceptionTypes) => {
  if (description) {
    ReactGA.exception({ description, fatal });
  }
};
