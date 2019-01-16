const formatter = new Intl.DateTimeFormat('default', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

const iso8601 = (date: number): string =>
  new Date(date).toISOString().slice(0, 10);

export { formatter };
export default iso8601;
