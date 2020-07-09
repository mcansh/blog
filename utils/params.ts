import { ParsedUrlQuery } from 'querystring';

function getParam<T = string>(param: T | T[] | undefined) {
  return Array.isArray(param) ? param[0] : param;
}

function getParams(
  params: ParsedUrlQuery
): { [key: string]: string | undefined } {
  return Object.entries(params).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: getParam(value) }),
    {}
  );
}

export { getParam, getParams };
