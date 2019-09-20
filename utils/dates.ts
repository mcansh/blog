type PossibleDates = string | number | Date;

const formatPostDate = (
  inputDate: PossibleDates,
  lang: string | string[] = 'en'
) =>
  new Intl.DateTimeFormat(lang, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'utc',
  }).format(new Date(inputDate));

const iso8601 = (date: PossibleDates) =>
  new Date(date).toISOString().slice(0, 10);

export { iso8601, formatPostDate };
