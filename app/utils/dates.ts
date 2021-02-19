import { formatISO, parseISO, format } from 'date-fns';

type PossibleDates = string | number | Date;

function parseDate(input: PossibleDates) {
  return typeof input === 'string' ? parseISO(input) : input;
}

const formatPostDate = (inputDate: PossibleDates) =>
  format(parseDate(inputDate), 'MMMM d, yyyy');

const iso8601 = (date: PossibleDates) =>
  formatISO(parseDate(date), { representation: 'date' });

export { iso8601, formatPostDate };
