import { widont } from '../../utils/widont';

it('replaces the last space with a no-break space', () => {
  expect(widont('the quick brown fox')).toEqual(`the quick brown\u00A0fox`);
});

it('does not replace the last space if the last two words are longer than 15 chars combined', () => {
  expect(
    widont(
      `some string that has a the last word crazy long, like repairabilities`
    )
  ).toEqual(
    `some string that has a the last word crazy long, like repairabilities`
  );
  expect(widont(`do you want some nachos with that holy guacamole?`)).toEqual(
    `do you want some nachos with that holy guacamole?`
  );
});
