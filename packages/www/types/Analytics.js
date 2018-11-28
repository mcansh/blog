// @flow

type logEventTypes = {|
  category: string,
  action: string,
|};

type logExceptionTypes = {|
  description: string,
  fatal?: boolean,
|};

export type { logEventTypes, logExceptionTypes };
