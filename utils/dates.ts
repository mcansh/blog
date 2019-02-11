const formatPostDate = (
  date: Date | string | number,
  lang?: string | string[]
) =>
  new Intl.DateTimeFormat(lang, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'America/New_York',
  }).format(new Date(date));

const iso8601 = (date: number): string =>
  new Date(date).toISOString().slice(0, 10);

export { formatPostDate };
export default iso8601;
