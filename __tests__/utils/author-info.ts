import * as author from '~/utils/author-info';

/**
 * probably could skip testing this as it's just a reexport of somebody
 */
it('returns the author', () => {
  expect(author).toEqual({
    email: 'logan@mcan.sh',
    name: 'Logan McAnsh',
    url: 'https://mcan.sh',
  });
});
