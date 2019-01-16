import iso8601, { formatter } from '../../utils/dates';

describe('dates', () => {
  it('returns the date in iso8601 date format', () => {
    const date = 1540180993028;
    const expectedResult = '2018-10-22';
    expect(iso8601(date)).toEqual(expectedResult);
  });

  it('returns the date', () => {
    expect(formatter.format(new Date('2019-01-15T00:00:00'))).toBe(
      'January 15, 2019'
    );
  });
});
