const formatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'America/New_York',
});

const iso8601 = (date: number): string =>
  new Date(date).toISOString().slice(0, 10);

export { formatter };
export default iso8601;
