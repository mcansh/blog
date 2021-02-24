import { formatISO, parseISO, format } from 'date-fns';

type PossibleDates = string | number | Date;

function parseDate(input: PossibleDates): Date {
  if (typeof input === 'string') return parseISO(input);
  if (typeof input === 'number') return new Date(input);
  return input;
}

function formatPostDate(input: PossibleDates): string {
  return format(parseDate(input), 'MMMM d, yyyy');
}

function iso8601(input: PossibleDates): string {
  return formatISO(parseDate(input), { representation: 'date' });
}

export { iso8601, formatPostDate };
