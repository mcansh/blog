import formatDate from '../../utils/dates';

describe('dates', () => {
  it('returns the date in "YYYY-MM-DD" format', () => {
    const date = 1540180993028;
    const expectedResult = '2018-10-22';
    expect(formatDate(date)).toEqual(expectedResult);
  });
});
