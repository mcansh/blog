// @flow
import tinydate from 'tinydate';

export const expandedString = (date: number): string => {
  const inputDate = new Date(date);
  const stamp = tinydate('{MMMM} {D}, {YYYY}');
  return stamp(inputDate);
};

export const YYYYMMDD = (date: number): string => {
  const inputDate = new Date(date);
  const stamp = tinydate('{YYYY}-{MM}-{DD}');
  return stamp(inputDate);
};
